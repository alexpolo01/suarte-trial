const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete galleryrequest by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteGalleryRequest(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    let transaction = await GalleryRequest.transaction(DbService.get());
    try 
    {
        const galleryrequest = await GalleryRequest.Controller.__deleteGalleryRequest(req.params.galleryrequest_id ?? req.body.galleryrequest_id, { transaction });
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
    deleteGalleryRequest
};