const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const ChatMessage = ModelsService.Models.ChatMessage;

        // Delete chatmessage by id
        app.delete(
            "/chatmessage/:chatmessage_id/", 
            [
                deactivateRoute,
                tokenValid,
                ChatMessage.Middlewares.canDeleteResource,
            ], 
            ChatMessage.Controller.deleteChatMessage
        );
    }

};