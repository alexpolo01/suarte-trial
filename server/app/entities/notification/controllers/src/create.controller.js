const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new notification
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createNotification(req, res) 
{
    const Notification = ModelsService.Models.Notification;
    let transaction = await Notification.transaction(DbService.get());
    try 
    {
        const invoice = await Notification.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(invoice.toJSON());
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
    createNotification
};