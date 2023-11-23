const ChatMessage = require("@entities/chatMessage/model");

ChatMessage.Controller = require("@entities/chatMessage/controllers");
ChatMessage.Routes = require("@entities/chatMessage/routes");
ChatMessage.Exceptions = require("@entities/chatMessage/exceptions");
ChatMessage.Seeders = require("@entities/chatMessage/seeders");
ChatMessage.Middlewares = require("@entities/chatMessage/middlewares");
ChatMessage.Validators = require("@entities/chatMessage/validators");

/**
 * VARIABLES
*/
ChatMessage.create_required_keys = [
    "message_text"
];

ChatMessage.updateable_keys = [];

ChatMessage.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: ChatMessage.Seeders.data
};

module.exports = ChatMessage;