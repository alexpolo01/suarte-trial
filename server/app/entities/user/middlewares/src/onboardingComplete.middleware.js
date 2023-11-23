const { usernameValidation } = require("@services/validation.service");
const ModelsService = require("@services/models.service");
const ExceptionService = require("@services/exception.service");

function isDate18orMoreYearsOld(year, month, day) 
{
    return new Date(year + 18, month, day) <= new Date();
}

async function onboardingComplete(req, res, next) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const username = req.body.user_username;
        usernameValidation(username);
        const birth = req.body.user_birth;
        if (!isDate18orMoreYearsOld(birth.year, birth.month, birth.day)) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "INVALID_AGE",
                error_message: "User must be at least 18yo",
                error_data: {
                    element: "user_birth"
                }
            });
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }
}

module.exports = onboardingComplete;