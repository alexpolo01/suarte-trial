const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Create new chatmessage
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createChatMessage(req, res) 
{
    const ChatMessage = ModelsService.Models.ChatMessage;
    try 
    {
        req.body.message_sender = req.token_decoded.uid;
        req.body.order = req.params.order_id;
        const chatmessage = await ChatMessage.createOne(req.body);
        return res.status(201).json(chatmessage.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createChatMessage
};