const { passwordValidation, usernameValidation } = require("@services/validation.service");
const { usernameExists } = require("@services/userExists.service");
const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");


/**
 * Update user info
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateUserInfo(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = req.user;
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        // If the user changed the username
        if (req.body.user_username !== user.user_username) 
        {
            // Username must be valid and unique
            usernameValidation(req.body.user_username);
            const exists = await usernameExists(req.body.user_username);
            if (exists.exists && exists.user._id !== user._id) 
            {
                throw new User.Exceptions.UserBadRequestException({
                    error_type: "INVALID_USERNAME_ALREADY_IN_USE",
                    error_message: "Username already exists",
                    error_data: {
                        element: "user_username",
                    }
                });
            }
            // If the user is a collector, the username can't be changed more than once a year
            if ((user.__t === "Collector" || user.__t === "Artist") && !user.canChangeUsername()) 
            {
                throw new User.Exceptions.UserBadRequestException({
                    error_type: "USERNAME_EXPIRED_ARTIST_COLLECTOR",
                    error_message: "Username can't be changed",
                    error_data: {
                        element: "user_username",
                    }
                });
            }
            else if (!user.canChangeUsername()) 
            {
                // If the user is a user, the username can't be changed more than once a month
                throw new User.Exceptions.UserBadRequestException({
                    error_type: "USERNAME_EXPIRED_GALLERY",
                    error_message: "Username can't be changed",
                    error_data: {
                        element: "user_username",
                    }
                });
            }
            user.user_flags.username_change_date = new Date();
            user.user_username = req.body.user_username;
        }
        user.user_name = req.body.user_name ?? user.user_name;
        user.user_image = req.body.user_image;
        user.user_profile_info = {
            ...user.user_profile_info,
            ...req.body.user_profile_info
        };
        await user.save();
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Update user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateUser(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        let container = { ...req.body, [User.modelId]: req.token_decoded.uid };
        const user = await User.Controller.__updateUser(container);
        return res.status(200).json(user.toJSON());
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Update password being logged in
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function updatePassword(req, res) 
{
    const User = ModelsService.Models.User;
    let state = "user_old_password";
    try 
    {
        const user = await User.findOne({ _id: req.token_decoded.id });
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        if(!req.body.user_old_password) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "EMPTY_FIELD",
                error_message: "Old password is required",
                error_data: {
                    element: "user_old_password",
                }
            });
        }
        if(!req.body.user_new_password) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "EMPTY_FIELD",
                error_message: "New password is required",
                error_data: {
                    element: "user_new_password",
                }
            });
        }
        await AuthService.logInWithEmailAndPassword(user.user_email, req.body.user_old_password);
        state = "user_new_password";
        passwordValidation(req.body.user_new_password);
        await AuthService.updateUserInFirebase(user._id, { password: req.body.user_new_password });
        return res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) 
    {
        console.log(error);
        if (error?.body?.error_data?.element) 
        {
            error.body.error_type = state === "user_old_password" ? "INVALID_OLD_PASSWORD" : error.body.error_type;
            error.body.error_data.element = state;
        }
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    updateUserInfo,
    updateUser,
    updatePassword
};