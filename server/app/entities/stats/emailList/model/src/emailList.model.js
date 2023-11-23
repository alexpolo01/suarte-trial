const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const mongoose = DbService.get();

const emaillistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    location : {
        type: Object,
        required: false,
    },
    ip_address: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("EmailList", emaillistSchema);
const EmailList = new KaindaModel(tmpModel);
module.exports = EmailList;
