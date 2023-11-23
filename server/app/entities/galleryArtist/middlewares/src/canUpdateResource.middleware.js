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
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        const galleryartist = await GalleryArtist.findOne({ [GalleryArtist.modelId]: req.params.galleryartist_id });
        if (!galleryartist) 
        {
            throw new GenericKaindaExceptions.Kainda404Exception();
        } 
        if (!galleryartist.artist_should_require_email && galleryartist.gallery._id !== req.token_decoded.uid) 
        {
            throw new GenericKaindaExceptions.Kainda403Exception();
        }
        if(galleryartist.artist_should_require_email) 
        {
            req.body = { 
                artist_email: req.body.artist_email,
                gallery: req.token_decoded.uid,
                type: req.body.type,
            };
        }
        req.galleryartist = galleryartist;
        next();
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = canUpdateResource;

