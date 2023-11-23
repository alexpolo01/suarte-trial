const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

async function _getOrder(req)
{
    const Order = ModelsService.Models.Order;
    const order = await Order.findOne({
        _id: req.params.order_id
    });

    if (!order) 
    {
        throw new Order.Exceptions.OrderNotFoundException({
            error_type: "NOT_FOUND",
            error_message: req.params.order_id + " not found",
            error_data: {
                req: req.body
            }
        });
    }

    if(req.token_decoded.uid != order.order_buyer._id && req.token_decoded.uid != order.order_seller._id)
    {
        throw new Order.Exceptions.OrderNotFoundException({
            error_type: "NOT_FOUND",
            error_message: req.params.order_id + " not found",
            error_data: {
                req: req.body
            }
        });
    }

    return order;
}

/**
 * Open new issue
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function openIssue(req, res) 
{
    const Order = ModelsService.Models.Order;
    try 
    {
        const order = await _getOrder(req);

        if (order.order_issue)
        {
            throw new Order.Exceptions.OrderAlreadyExistsException({
                error_type: "ALREADY_EXISTS",
                error_message: "Order issue already exists",
                error_data: {
                    req: req.body
                }
            });
        }

        const issue = {
            issue_artwork_received: req.body.issue_artwork_received,
            issue_message: req.body.issue_message,
            issue_evidence: req.body.issue_evidence,
        };

        order.order_issue = issue;
        await order.save();
        return res.status(200).json(order.order_issue);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Close issue
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function closeIssue(req, res) 
{
    const Order = ModelsService.Models.Order;
    try
    {
        const order = await _getOrder(req);

        if (!order.order_issue)
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Order issue not found",
                error_data: {
                    req: req.body
                }
            });
        }

        order.order_issue.issue_status = "resolved";
        await order.save();
        return res.status(200).json(order.toJSON());
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Involve admin
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function involveSuarte(req, res)
{
    const Order = ModelsService.Models.Order;
    try
    {
        const order = await _getOrder(req);

        if (!order.order_issue)
        {
            throw new Order.Exceptions.OrderNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Order issue not found",
                error_data: {
                    req: req.body
                }
            });
        }

        order.order_issue.order_status = "involve_suarte";
        await order.save();

        // TODO: Send email to suarte

        return res.status(200).json(order);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    openIssue,
    closeIssue,
    involveSuarte
};