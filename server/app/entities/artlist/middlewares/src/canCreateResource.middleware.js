const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
/**
 * Check if the user that makes the request can create the resource specified in the request
 * Every user can create an Artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canCreateResource(req, res, next) 
{
    const Artlist = ModelsService.Models.Artlist;
    const User = ModelsService.Models.User;
    try 
    {
        // If user has 3 or more artlists, he can't create more
        const artlistsCount = await Artlist.subModel.countDocuments({ artlist_creator: req.token_decoded.uid });
        if (artlistsCount >= 3)
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "MAX_ARTLISTS",
                error_message: "User " + req.token_decoded.uid + " cannot create more artlists",
                error_data: {
                    req: req.body,
                    element: "artlist_description",
                }
            });
        }
        next();
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = canCreateResource;

