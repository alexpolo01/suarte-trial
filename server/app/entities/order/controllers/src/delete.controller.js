const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete order by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteOrder(req, res) 
{
    const Order = ModelsService.Models.Order;
    let transaction = await Order.transaction(DbService.get());
    try 
    {
        const order = await Order.deleteOne(req.params.order_id ?? req.body.order_id, { transaction });
        await transaction.commit();
        return res.status(200).json(order.toJSON());
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
    deleteOrder
};