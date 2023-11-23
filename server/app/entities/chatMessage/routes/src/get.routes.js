const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    getAllMessagesFromOrder : function (app)
    {
        const ChatMessage = ModelsService.Models.ChatMessage;

        // Get all chatmessages from order
        app.get(
            "/order/:order_id/chat",
            [
                tokenValid,
            ],
            ChatMessage.Controller.getAllMessagesFromOrder
        );
    }

};