const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new internalcollection
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createInternalCollection(req, res) 
{
    const InternalCollection = ModelsService.Models.InternalCollection;
    let transaction = await InternalCollection.transaction(DbService.get());
    try 
    {
        const internalcollection = await InternalCollection.createOne({
            ...req.body,
            order: 99999,
            order_mobile: 99999
        }, { transaction });
        await transaction.commit();
        return res.status(201).json(internalcollection.toJSON());
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
    createInternalCollection
};