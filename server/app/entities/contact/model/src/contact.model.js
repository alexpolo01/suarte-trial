const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const contactSchema = new mongoose.Schema({
    contact_email: {
        type: String,
        required: true,
    },
    contact_name: {
        type: String,
        required: false,
    },
    contact_message: {
        type: String,
        required: true,
    },
    contact_status : {
        type: String,
        required: true,
        enum: ["new", "read", "replied", "closed"],
        default: "new",
    },
    contact_user_id : {
        type: String,
        required: false,
    },
    contact_type_user : {
        type: String,
        required: false,
    }
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("Contact", contactSchema);
const Contact = new KaindaModel(tmpModel);
module.exports = Contact;
