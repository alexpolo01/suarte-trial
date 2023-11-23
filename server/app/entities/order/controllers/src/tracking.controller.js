const ModelsService = require("@services/models.service");
const ExceptionService = require("@services/exception.service");
const LogService = require("@services/log.service");
const SocketService = require("@services/socket.service");


async function addTracking(req, res) 
{
    const Order = ModelsService.Models.Order;
    try
    {
        const order = await Order.findOne({
            order_number: req.params.order_number
        });

        if(!order)
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.order_number + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        if (!order.order_tracking)
        {
            order.order_tracking = {};
        }

        order.order_tracking.tracking_number = req.body.tracking_number;
        order.order_tracking.shipping_courier_company = req.body.shipping_courier_company;
        order.order_status = "sent";
        await order.save();
        return res.status(200).json(order);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function confirmReception(req, res)
{
    const Order = ModelsService.Models.Order;
    try
    {
        const order = await Order.findOne({
            order_number: req.params.order_number
        });

        if(!order)
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.order_number + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        order.order_status = "completed";
        await order.save();
        artworkId = order.order_artwork;
        SocketService.sendNotificationArtwork(false, "confirmReception", req.token_decoded.uid, artworkId);
        return res.status(200).json(order);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    addTracking,
    confirmReception
};

