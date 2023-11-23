const { passwordValidation } = require("@services/validation.service");
const { emailExists } = require("@services/userExists.service");
const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createUser(req, res) 
{
    const User = ModelsService.Models.User;
    const Collector = ModelsService.Models.User.Collector;
    let user_id = null;
    try 
    {
        req.body.user_email = req.body.user_email.toLowerCase().trim();
        // Check if email already exists and throw error if it does
        const exists = await emailExists(req.body.user_email, null, ["user_email", "artist_email"]);
        if (exists.exists) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_message: "Email already exists",
                error_type: exists.key === "artist_email" ? "EMAIL_BELONGS_TO_ARTIST" : "EMAIL_IN_USE",
                error_data: {
                    element: "user_email",
                }
            });
        }
        // Validate password complexity
        passwordValidation(req.body.user_password);
        // Create user in firebase
        const user_info = {
            user_email: req.body.user_email,
            user_password: req.body.user_password,
        };
        if(req.body.invite)
        {
            user_info.user_referral = req.body.invite;
        }
        const firebase_user = await AuthService.createUserInFirebase(user_info);
        // Create user in database
        user_id = firebase_user.uid;
        user_info._id = firebase_user.uid;
        const collector = await Collector.createOne({
            ...req.body,
            ...user_info,
        });
        // Generate custom token to login user
        const token = await AuthService.createCustomToken(collector._id, collector.toJSON());
        return res.status(201).json({
            auth: true, 
            custom_token: token, 
            user_session: collector.toJSON()
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (user_id) 
        {
            await AuthService.deleteUserInFirebase(user_id);
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createUser
};