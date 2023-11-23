const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete galleryartist by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteGalleryArtist(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    let transaction = await GalleryArtist.transaction(DbService.get());
    try 
    {
        const galleryartist = await GalleryArtist.Controller.__deleteGalleryArtist(req.params.galleryartist_id ?? req.body.galleryartist_id, { transaction });
        await transaction.commit();
        return res.status(200).json(galleryartist.toJSON());
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
    deleteGalleryArtist
};