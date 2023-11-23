const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Add artwork to collection
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function addArtworkToCollection(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    const CollectionArtwork = InternalCollection.CollectionArtwork;
    try 
    {
        const collection = await InternalCollection.findOne({
            collection_id: req.params.collection_id
        });
        if (!collection) 
        {
            throw new InternalCollection.Exceptions.InternalCollectionNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.collection_id + " not found",
            });
        }
        const artwork = await CollectionArtwork.findOne({
            collection_id: collection._id,
            artwork: req.params.artwork_id
        });
        if(artwork) {
            throw new InternalCollection.Exceptions.CollectionArtworkAlreadyExistsException({
                error_type: "Already Exists",
                error_message: "Already Exists",
            })
        }
        const collectionArtwork = await CollectionArtwork.createOne({
            collection_id: collection._id,
            artwork: req.params.artwork_id,
            metadata : req.body.metadata
        });
        return res.status(200).json(collectionArtwork.toJSON());
    }
    catch (error)
    {
        console.log(error);
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    addArtworkToCollection
};