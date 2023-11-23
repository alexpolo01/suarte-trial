const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete chatmessage by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteChatMessage(req, res) 
{
    const ChatMessage = ModelsService.Models.ChatMessage;
    let transaction = await ChatMessage.transaction(DbService.get());
    try 
    {
        const chatmessage = await ChatMessage.deleteOne(req.params.chatmessage_id ?? req.body.chatmessage_id, { transaction });
        await transaction.commit();
        return res.status(200).json(chatmessage.toJSON());
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
    deleteChatMessage
};