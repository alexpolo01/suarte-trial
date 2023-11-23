const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const notificationSchema = new mongoose.Schema({
    notification_receiver: {
        type: String,
        required: true,
    },
    notification_data : {
        type: Object,
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("Notification", notificationSchema);
const Notification = new KaindaModel(tmpModel);
module.exports = Notification;
