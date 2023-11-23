const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const ChatMessage = ModelsService.Models.ChatMessage;

        // Create new chatmessage
        app.post(
            "/order/:order_id/chat",
            [
                tokenValid,
                ChatMessage.Middlewares.canCreateResource,
                ChatMessage.Middlewares.checkRequiredKeys
            ],
            ChatMessage.Controller.createChatMessage
        );
    }

};