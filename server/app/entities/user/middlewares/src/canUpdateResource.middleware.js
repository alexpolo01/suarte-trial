const ModelsService = require("@services/models.service");
const ExceptionService = require("@services/exception.service");
const LogService = require("@services/log.service");

/**
 * Check if the user that makes the request can update the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canUpdateResource(req, res, next) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findById(req.token_decoded.id);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
                error_data: {
                    user_id: req.token_decoded.uid
                }
            });
        }
        // If not a collector, name must be present
        /*if (user.__t !== "Collector" && user.__t !== "Admin" && !req.body.user_name) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "EMPTY_FIELD",
                error_message: "User name not found",
                error_data: {
                    element: "user_name"
                }
            });
        }
        // If not a collector, name must be present
        if (!req.body.user_username) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "EMPTY_FIELD",
                error_message: "User name not found",
                error_data: {
                    element: "user_username"
                }
            });
        }*/
        req.user = user;
        next();
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = canUpdateResource;

