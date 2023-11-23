const { passwordValidation } = require("@services/validation.service");
const ModelsService = require("@services/models.service");
const EmailService = require("@services/email.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

async function forgotPassword(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        let user = await User.findOne({ user_email: req.body.user_email });
        if (!user) 
        {
            user = await User.findOne({ user_username: req.body.user_email });
        }
        if (user) 
        {
            const link = await AuthService.getPasswordResetLinkFromFirebase(user.user_email, user._id).catch();
            EmailService.send(EmailService.EmailTypes.FORGOT_PASSWORD, {
                from: {
                    name: "Suarte",
                    address: "no-reply@suarte.art",
                },
                to: user.user_email,
            }, {
                user_name: user.user_name ?? user.user_username ?? "User",
                link
            });
        }
        return res.status(200).json({});
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function resetPassword(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const oobCode = req.body.oobCode ?? "invalid";
        if (oobCode === "invalid") 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "INVALID_OOB_CODE",
                error_message: "Invalid oobCode",
                error_data: {
                    error_code: "INVALID_OOB_CODE",
                    element: "user_password",
                }
            });
        }
        const newPassword = req.body.user_password;
        passwordValidation(newPassword);
        await AuthService.resetPasswordInFirebase(oobCode, newPassword);
        res.status(200).json({ auth: true });
        if(req.body.user_email) 
        {
            const user = await User.findOne({ user_email: req.body.user_email });
            EmailService.send(EmailService.EmailTypes.PASSWORD_CHANGED, {
                from: {
                    name: "Suarte",
                    address: "no-reply@suarte.art",
                },
                to: user.user_email,
            }, {
                user_name: user.user_name ?? user.user_username ?? "User",
            });
        }
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    forgotPassword,
    resetPassword
};