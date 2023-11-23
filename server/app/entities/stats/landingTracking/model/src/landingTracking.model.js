const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const mongoose = DbService.get();

const addressSchema = require("@entities/auxiliarSchemas/address.schema");

const landingtrackingSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true,
    },
    base_url: {
        type: String,
        required: true,
    },
    search_params: {
        type: Object,
        required: true,
    },
    ip_address: {
        type: String,
        required: true,
    },
    location: {
        type: addressSchema,
        required: true,
    },
    user_agent: {
        type: Object,
        required: true,
    },
    user_email: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("LandingTracking", landingtrackingSchema);
const LandingTracking = new KaindaModel(tmpModel);
module.exports = LandingTracking;
