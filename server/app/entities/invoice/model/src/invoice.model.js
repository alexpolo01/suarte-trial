const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const invoiceSchema = new mongoose.Schema({
    invoice_owner: {
        type: String,
        ref: "Gallery",
        required: true,
    },
    invoice_name : {
        type: String,
        required: true,
    },
    invoice_start_date: {
        type: Date,
        required: true,
    },
    invoice_end_date: {
        type: Date,
        required: true,
    },
    invoice_url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("Invoice", invoiceSchema);
const Invoice = new KaindaModel(tmpModel);
module.exports = Invoice;
