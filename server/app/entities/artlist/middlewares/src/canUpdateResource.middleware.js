const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const { GenericKaindaExceptions } = require("kainda");
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
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        if (!req.token_decoded || !req.token_decoded.uid || !req.params.artlist_id) 
        {
            // Probably impossible to reach this, but to be sure.
            throw new GenericKaindaExceptions.Kainda401Exception();
        }
        // Get the artlist from the database
        const artlist = await Artlist.findById(req.params.artlist_id);
        // If there is no artlist, 404
        if (!artlist) 
        {
            throw new Artlist.Exceptions.ArtlistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artlist_id + " not found",
                error_data: {
                    artlist_id: req.params.artlist_id
                }
            });
        }
        // If the creator is not who is trying to update it, 401
        if (artlist.artlist_creator._id !== req.token_decoded.uid) 
        {
            throw new GenericKaindaExceptions.Kainda401Exception();
        }
        req.artlist = artlist;
        next();
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = canUpdateResource;

