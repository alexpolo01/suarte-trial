const ModelsService = require("./models.service");
const config = require("config");

function usernameValidation(username) 
{
    if (typeof username !== "string") 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME",
            error_message: "Username must be a string",
            error_data: {
                element: "user_username"
            }
        });
    }
    if (username.length < 3) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME_TOO_SHORT",
            error_message: "Username must be at least 3 characters long",
            error_data: {
                element: "user_username"
            }
        });
    }
    if (username.length > 20) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME_TOO_LONG",
            error_message: "Username must be at most 20 characters long",
            error_data: {
                element: "user_username"
            }
        });

    }
    // Username must have at least one letter
    if (!/[a-zA-Z]/.test(username)) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME_NO_LETTER",
            error_message: "Username must have at least one letter",
            error_data: {
                element: "user_username"
            }
        });
    }
    // Username can have only letters, numbers or underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME_CHARACTER_NOT_ALLOWED",
            error_message: "Username can have only letters, numbers or underscores",
            error_data: {
                element: "user_username"
            }
        });
    }
    // Username can't have two underscores in a row
    if (/__/.test(username)) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_USERNAME_TWO_UNDERSCORES_IN_A_ROW",
            error_message: "Username can't have two underscores in a row",
            error_data: {
                element: "user_username"
            }
        });
    }

    return true;

}


function passwordValidation(password) 
{
    if (!password) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "EMPTY_FIELD",
            error_message: "The password field is empty.",
            error_data: {
                error_code: "EMPTY_FIELD",
                element: "user_password",
            }
        });
    }
    else if (password.length < config.get("password.minLength")) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_PASSWORD_TOO_SHORT",
            error_message: "The password is too short.",
            error_data: {
                error_code: "INVALID_PASSWORD_TOO_SHORT",
                element: "user_password",
            }
        });
    }
    else if (password.length > config.get("password.maxLength")) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_PASSWORD_TOO_LONG",
            error_message: "The password is too long.",
            error_data: {
                error_code: "INVALID_PASSWORD_TOO_LONG",
                element: "user_password",
            }
        });
    }
    // At least one letter, uppercase or lowercase
    else if (!password.match(/[A-Za-z]/))
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_PASSWORD_NO_LOWERCASE",
            error_message: "The password is invalid.",
            error_data: {
                error_code: "INVALID_PASSWORD_NO_LOWERCASE",
                element: "user_password",
            }
        });
    }
    // // At least one uppercase letter
    // else if (!password.match(/[A-Z]/)) 
    // {
    //     throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
    //         error_type: "INVALID_PASSWORD_NO_UPPERCASE",
    //         error_message: "The password is invalid.",
    //         error_data: {
    //             error_code: "INVALID_PASSWORD_NO_UPPERCASE",
    //             element: "user_password",
    //         }
    //     });
    // }
    // // At least one lowercase letter
    // else if (!password.match(/[a-z]/)) 
    // {
    //     throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
    //         error_type: "INVALID_PASSWORD_NO_LOWERCASE",
    //         error_message: "The password is invalid.",
    //         error_data: {
    //             error_code: "INVALID_PASSWORD_NO_LOWERCASE",
    //             element: "user_password",
    //         }
    //     });
    // }
    // At least one number
    else if (!password.match(/[0-9]/)) 
    {
        throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
            error_type: "INVALID_PASSWORD_NO_NUMBER",
            error_message: "The password is invalid.",
            error_data: {
                error_code: "INVALID_PASSWORD_NO_NUMBER",
                element: "user_password",
            }
        });
    // At least one special character
    // } else if (!password.match(/[^A-Za-z0-9]/)) {
    //     throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
    //         error_type: "INVALID_PASSWORD_NO_SPECIAL_CHARACTER",
    //         error_message: "The password is invalid.",
    //         error_data: {
    //             error_code: "INVALID_PASSWORD_NO_SPECIAL_CHARACTER",
    //             element: "user_password",
    //         }
    //     });
    }
    else 
    {
        return true;
    }
}



module.exports = {
    usernameValidation,
    passwordValidation
};