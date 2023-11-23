const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get my orders
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOrders(req, res) 
{
    const Order = ModelsService.Models.Order;
    try 
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: {
                createdAt: -1
            },
            customLabels: {
                docs: "data",
            },
            populate: [
                "order_artwork",
                "order_buyer",
                "order_seller",
                "order_product"
            ]
        };

        let query = {
            order_status: req.params.order_status
        };

        if (req.query.type == "buyer")
        {
            query.order_buyer = req.token_decoded.uid;
        }
        else
        {
            query.order_seller = req.token_decoded.uid;
        }

        if (req.params.order_status == "pending" && req.query.type == "buyer")
        {
            query.order_status = {
                $in: ["pending", "payment_pending"]
            };
        }
        else if (req.params.order_status == "completed")
        {
            query.order_status = {
                $in: ["completed", "cancelled", "refunded"]
            };
        }

        if (req.query.type == "seller")
        {
            query = {
                ...query,
                $or: [
                    {
                        order_limited_edition_data: {
                            $exists: false
                        }
                    },
                    {
                        order_limited_edition_data: {
                            $eq: null
                        }
                    }
                ]
            };
        }

        const results = await Order.subModel.paginate(query, options);
        return res.status(200).json(results);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get order by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOrderById(req, res) 
{
    const Order = ModelsService.Models.Order;
    try 
    {
        const order = await Order.findOne({
            order_number: req.params.order_number
        });

        if (!order) 
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.order_number + " not found",
                error_data: {
                    req: req.body
                }
            }, 200);
        }
        return res.status(200).json(order.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getOrders,
    getOrderById
};