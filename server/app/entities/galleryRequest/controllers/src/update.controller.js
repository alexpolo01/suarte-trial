const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");


/**
 * Update galleryrequest
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateGalleryRequest(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    let transaction = await GalleryRequest.transaction(DbService.get());
    try 
    {
        let container = { ...req.body, [GalleryRequest.modelId]: req.params.galleryrequest_id };
        const galleryrequest = await GalleryRequest.Controller.__updateGalleryRequest(container, { transaction });
        await transaction.commit();
        return res.status(200).json(galleryrequest.toJSON());
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
    updateGalleryRequest
};