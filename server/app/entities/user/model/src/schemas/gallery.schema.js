const DbService = require("@services/db.service");
const mongoose = DbService.get();

const addressSchema = require("@entities/auxiliarSchemas/address.schema");
const bankDataSchema = require("@entities/auxiliarSchemas/bankData.schema");

const gallerySchema = new mongoose.Schema({
    gallery_address: {
        type: addressSchema,
        required: true
    },
    gallery_business_id: {
        type: String,
        required: true
    },
    gallery_agent: {
        type: Object,
        required: true,
        default: {}
    },
    gallery_shippings: {
        type: Array,
        required: true,
        default: []
    },
    gallery_bank_data: {
        type: bankDataSchema,
    },
    gallery_closed: {
        type: Object,
        date : {
            type: Date,
            required: false,
        },
        reason: {
            type: String,
            required: false,
        }
    },
    gallery_notify_me_when_opens: {
        type: [Object],
        required: false,
        default: []
    },
}, {

});

gallerySchema.statics.validateBankData = bankDataSchema.validate;

module.exports = gallerySchema;