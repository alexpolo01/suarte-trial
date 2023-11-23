const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");


/**
 * Update artistrequest
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateArtistRequest(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    let transaction = await ArtistRequest.transaction(DbService.get());
    try 
    {
        let container = { ...req.body, [ArtistRequest.modelId]: req.params.artistrequest_id };
        const artistrequest = await ArtistRequest.Controller.__updateArtistRequest(container, { transaction });
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
    updateArtistRequest
};