const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update chatmessage
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateChatMessage(req, res) 
{
    const ChatMessage = ModelsService.Models.ChatMessage;
    let transaction = await ChatMessage.transaction(DbService.get());
    try 
    {
        const chatmessage = await ChatMessage.Controller.updateOne(
            req.body,
            {
                [ChatMessage.modelId]: req.params.chatmessage_id,
            },
            {
                transaction
            }
        );
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
    updateChatMessage
};