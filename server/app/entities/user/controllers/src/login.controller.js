const { emailExists } = require("@services/userExists.service");
const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

async function logInPassword(req, res) 
{
    console.log("Login with Password")
    const User = ModelsService.Models.User;
    try 
    {
        let user_email = req.body.user_email?.toLowerCase();
        const user_password = req.body.user_password;
        let user = await User.fromEmailOrUsername(user_email);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "INVALID_CREDENTIALS",
                error_message: "Invalid username or password.",
                error_data: {
                    error_code: "INVALID_CREDENTIALS",
                    user_email: user_email,
                    element: "user_password",
                }
            });
        }
        const data = await AuthService.logInWithEmailAndPassword(user.user_email, user_password);
        const token = await AuthService.createCustomToken(data.localId, user.toJSON());
        res.status(200).json({ auth: true, custom_token: token, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function registerIfNotExists(req, user_id, decoded_token, transaction) 
{
    const User = ModelsService.Models.User;
    const Collector = ModelsService.Models.User.Collector;
    try 
    {
        const exists = await emailExists(decoded_token.email, null, ["artist_email"]);
        if (exists.exists) 
        {
            await AuthService.deleteUserInFirebase(user_id);
            throw new User.Exceptions.UserBadRequestException({
                error_type: "EMAIL_BELONGS_TO_ARTIST",
                error_message: "Email already in use.",
                error_data: {
                    error_code: "EMAIL_BELONGS_TO_ARTIST",
                    element: "user_email",
                }
            });
        }
        const data = {
            _id: user_id,
            user_email: decoded_token.email,
        };
        if(req.body.invite)
        {
            data.user_referral = req.body.invite;
        }
        const user = await Collector.createOne(data, { transaction });
        return user;
    }
    catch (error) 
    {
        if (error.error_type !== "EMAIL_IN_USE" || error.error_type !== "EMAIL_BELONGS_TO_ARTIST") 
        {
            throw error;
        }
    }
}

async function logInGoogle(req, res) 
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());
    try 
    {
        // We verify the token with Firebase
        const decoded_token = await AuthService.verifyFirebaseAccessToken(req.body.access_token);
        const user_id = decoded_token.uid;
        // We check if the user exists in our database
        let user = await User.findOne({ user_email: decoded_token.email }, { transaction });
        // If the user doesn't exist, we create it
        if (!user) 
        {
            user = await registerIfNotExists(req, user_id, decoded_token, transaction);
        }
        const response = await AuthService.createCustomToken(user_id, user.toJSON());
        await transaction.commit();
        return res.status(200).json({ auth: true, custom_token: response, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

async function logInIdToken(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        let user_email = req.body.user_email?.toLowerCase();
        const user_password = req.body.user_password;
        let user = await User.fromEmailOrUsername(user_email);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "INVALID_CREDENTIALS",
                error_message: "Invalid username or password.",
                error_data: {
                    error_code: "INVALID_CREDENTIALS",
                    user_email: user_email,
                    element: "user_password",
                }
            });
        }
        const data = await AuthService.logInWithEmailAndPassword(user.user_email, user_password);
        const response = await AuthService.createIdToken(data.localId, user.toJSON());
        res.status(200).json({ auth: true, token: response._tokenResponse.idToken, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    logInPassword,
    logInGoogle,
    logInIdToken
};