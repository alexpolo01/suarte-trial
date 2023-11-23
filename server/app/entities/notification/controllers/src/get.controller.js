const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

async function getNotificationByToken(req, res) 
{
    const Notification = ModelsService.Models.Notification;
    console.log("Notification --------------------------->\n", req);
    try 
    {
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

        const notifications = await Notification.subModel.find({
            notification_receiver: req.token_decoded.user_email
        }, options);

        notifications.current_balance =  0;
        notifications.number_of_movements = 0;

        return res.status(200).json({});
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getNotificationByToken
};