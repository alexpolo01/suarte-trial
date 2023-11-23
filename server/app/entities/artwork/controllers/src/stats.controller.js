const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * New visit
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function newVisit(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    const ArtworkVisit = Artwork.ArtworkVisit;
    try
    {
        const data = {
            artwork: req.params.artwork_id,
            user: req.token_decoded?.uid,
            location: req.location,
        };
        const artwork = await ArtworkVisit.createOne(data);
        return res.status(201).json(artwork.toJSON());
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    newVisit
};