const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update SearchTypes Orders
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateSearchTypesOrder(req, res) 
{
    const SearchType = ModelsService.Models.SearchType;
    let transaction = await SearchType.transaction(DbService.get());

    try {
        for(let idx = 0; idx < req.body.length; idx ++){
            const searchTypeId = req.body[idx];
            await SearchType.updateOne(
                { "order": idx + 1 },
                {
                    type_id: searchTypeId
                },
            );
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

/**
 * Update SearchType Items Orders
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateSearchTypeItemOrders(req, res) 
{
    const SearchType = ModelsService.Models.SearchType;
    let transaction = await SearchType.transaction(DbService.get());
    const searchTypeId = req.params.type_id;

    try {
        if(req.body.length !== 4) throw new Error("Must be 4 items");
        
        await SearchType.updateOne(
            { "search_orders": req.body },
            {
                type_id: searchTypeId
            },
        );
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateSearchTypesOrder,
    updateSearchTypeItemOrders
};