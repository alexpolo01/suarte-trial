const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete artistrequest by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteArtistRequest(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    let transaction = await ArtistRequest.transaction(DbService.get());
    try 
    {
        const artistrequest = await ArtistRequest.Controller.__deleteArtistRequest(req.params.artistrequest_id ?? req.body.artistrequest_id, { transaction });
        await transaction.commit();
        return res.status(200).json(artistrequest.toJSON());
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
    deleteArtistRequest
};