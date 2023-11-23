const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update internalcollection
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateInternalCollection(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    let transaction = await InternalCollection.transaction(DbService.get());
    try 
    {
        const internalcollection = await InternalCollection.Controller.updateOne(
            req.body,
            {
                [InternalCollection.modelId]: req.params.internalcollection_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(internalcollection.toJSON());
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
 * Update internalcollection name
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateCollectionName(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    let transaction = await InternalCollection.transaction(DbService.get());
    try 
    {
        const internalcollection = await InternalCollection.updateOne(
            { collection_name: req.body.name, collection_id: req.body.id },
            {
                collection_id: req.params.internalcollection_id,
            },
            {
                transaction
            }
        );
        console.log(internalcollection);
        await transaction.commit();
        return res.status(200).json({success: true});
    }
    catch (error) 
    {
        console.log(error);
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

/**
 * Update CollectionArtwork Orders
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateCollectionArtworkOrders(req, res) 
{
    const collection_id = req.params.internalcollection_id;
    const InternalCollection = ModelsService.Models.InternalCollection;
    const CollectionArtwork = InternalCollection.CollectionArtwork;
    const Artwork = ModelsService.Models.Artwork;

    try {
        const internalcollection = await InternalCollection.findOne({
            collection_id
        });
        for(let idx = 0; idx < req.body.length; idx ++){
            const artwork = req.body[idx];
            const art = await Artwork.findOne({
                _id: artwork
            });
            const res = await CollectionArtwork.updateOne(
                { "order": idx + 1 },
                { 
                    collection_id: internalcollection._id, 
                    artwork: art._id
                },
            );
            console.log(res);
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        LogService.ErrorLogger.error(error);
        /*if (transaction) 
        {
            await transaction.rollback();
        }*/
        ExceptionService.handle(error, res);
    }
}

/**
 * Update CollectionArtwork Orders
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateCollectionsOrder(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    const is_mobile = req.params.is_mobile == "true";

    try {
        for(let idx = 0; idx < req.body.length; idx ++){
            const collection_id = req.body[idx];
            const internalcollection = await InternalCollection.findOne({
                collection_id
            });
            const updateQuery = is_mobile ? { "order_mobile": idx + 1 } : { "order": idx + 1 };
            const res = await InternalCollection.updateOne(
                updateQuery,
                { "_id": internalcollection._id },
            );
            console.log(res);
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateInternalCollection,
    updateCollectionArtworkOrders,
    updateCollectionsOrder,
    updateCollectionName
};