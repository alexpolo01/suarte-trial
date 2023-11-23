const ModelsService = require("@services/models.service");

function FirebaseErrorHandler(error) 
{
    const User = ModelsService.Models.User;
    if (error.response?.data?.error?.message?.includes("TOO_MANY_ATTEMPTS_TRY_LATER") || error.code === "auth/too-many-requests") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "TOO_MANY_ATTEMPTS_TRY_LATER",
            error_message: "Too many attempts, try again later.",
            error_data: {
                error_code: "TOO_MANY_ATTEMPTS_TRY_LATER",
                element: "user_password",
            }
        });
    }
    else if (error.response?.data?.error?.message?.includes("INVALID_OOB_CODE") || error.code === "auth/invalid-action-code") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_OOB_CODE",
            error_message: "Invalid oob code.",
            error_data: {
                error_code: "INVALID_OOB_CODE",
                element: "user_password",
            }
        }, 400);
    }
    else if (error.response?.data?.error?.message?.includes("EXPIRED_OOB_CODE") || error.code === "auth/expired-action-code") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_OOB_CODE",
            error_message: "Expired oob code.",
            error_data: {
                error_code: "INVALID_OOB_CODE",
                element: "user_password",
            }
        }, 400);
    }
    else if (error.response?.data?.error?.message?.includes("WEAK_PASSWORD") || error.code === "auth/weak-password" || error.code === "auth/invalid-password") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "WEAK_PASSWORD",
            error_message: "The password is too weak.",
            error_data: {
                error_code: "WEAK_PASSWORD",
                element: "user_password",
            }
        });
    }
    else if (error.response?.data?.error?.message?.includes("EMAIL_EXISTS") || error.code === "auth/email-already-exists" || error.code === "auth/email-already-in-use") 
    {
        error =  new User.Exceptions.UserBadRequestException({
            error_type: "EMAIL_IN_USE",
            error_message: "The email already exists.",
            error_data: {
                element: "user_email",
                error_code: "EMAIL_IN_USE",
            }
        });
    }
    else if (error.code === "auth/invalid-email") 
    {
        error =  new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_EMAIL",
            error_message: "The email is invalid.",
            error_data: {
                element: "user_email",
                error_code: "INVALID_EMAIL",
            }
        });
    }
    else if (error.code === "auth/user-not-found") 
    {
        error =  new User.Exceptions.UserNotFoundException({
            error_type: "USER_NOT_FOUND",
            error_message: "The user was not found.",
            error_data: {
                element: "user_email",
                error_code: "USER_NOT_FOUND",
            }
        });
    }
    return error;
}

module.exports = {
    FirebaseErrorHandler,
};