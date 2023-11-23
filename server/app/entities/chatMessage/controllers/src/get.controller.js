const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all messages from an order
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllMessagesFromOrder(req, res)
{
    const Order = ModelsService.Models.Order;
    const ChatMessage = ModelsService.Models.ChatMessage;
    try
    {
        const order = await Order.findById(req.params.order_id);
        if (!order) 
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.order_id + " not found",
                error_data: {
                    req: req.body
                }
            }, 200);
        }

        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            sort : {
                createdAt : -1
            },
            customLabels : {
                docs : "data",
            }
        };

        const query = {
            order : req.params.order_id
        };

        const results = await ChatMessage.subModel.paginate(query, options);
        return res.status(200).json(results);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllMessagesFromOrder
};