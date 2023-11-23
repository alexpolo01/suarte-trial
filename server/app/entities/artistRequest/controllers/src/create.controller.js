const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new artistrequest
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createArtistRequest(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    let transaction = await ArtistRequest.transaction(DbService.get());
    try 
    {
        await ArtistRequest.checkProfileAvailability(req.body.user_email);
        const gallery_artist = await ModelsService.Models.GalleryArtist.findOne({ 
            artist_email: req.body.user_email 
        }, transaction);
        const code = ArtistRequest.generateCode();
        const artistrequest = await ArtistRequest.createOne({
            user_email: req.body.user_email,
            user_code: code,
            status: "pending",
            gallery_artist : gallery_artist ? gallery_artist._id : null
        }, transaction);
        await transaction.commit();
        return res.status(201).json({
            ...artistrequest.toJSON(),
            oobCode: artistrequest._id
        });
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

module.exports = {
    createArtistRequest
};