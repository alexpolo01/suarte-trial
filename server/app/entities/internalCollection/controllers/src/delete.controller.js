const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete internalcollection by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteInternalCollection(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    let transaction = await InternalCollection.transaction(DbService.get());
    try 
    {
        await InternalCollection.deleteOne({ collection_id: req.params.internalcollection_id ?? req.body.internalcollection_id });
        await transaction.commit();
        return res.status(200).json({ message: "success" });
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


/**
 * Delete internalcollection by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteArtworkFromCollection(req, res) 
{
    const collection_id = req.params.internalcollection_id, 
        artwork_id = req.params.artwork_id;
    const InternalCollection = ModelsService.Models.InternalCollection;
    const CollectionArtwork = InternalCollection.CollectionArtwork;
    try 
    {
        const collection = await InternalCollection.findOne({
            collection_id: collection_id
        });
        if (!collection) 
        {
            throw new InternalCollection.Exceptions.InternalCollectionNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.collection_id + " not found",
            });
        }
        await CollectionArtwork.deleteOne({
            collection_id: collection._id,
            artwork: artwork_id
        });
        return res.status(200).json({ message: "success" });
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deleteInternalCollection,
    deleteArtworkFromCollection
};