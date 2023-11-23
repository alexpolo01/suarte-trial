const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const ChatMessage = ModelsService.Models.ChatMessage;

        // Update chatmessage
        app.put(
            "/chatmessage/:chatmessage_id/", 
            [
                deactivateRoute,
                tokenValid,
                ChatMessage.Middlewares.canUpdateResource,
            ], 
            ChatMessage.Controller.updateChatMessage
        );
    }

};