const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const chatmessageSchema = new mongoose.Schema({
    message_sender: {
        type: String,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    message_text: {
        type: String,
        required: true,
    },
    message_metadata: {
        type: Object,
        required: false,
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("ChatMessage", chatmessageSchema);
const ChatMessage = new KaindaModel(tmpModel);
module.exports = ChatMessage;
