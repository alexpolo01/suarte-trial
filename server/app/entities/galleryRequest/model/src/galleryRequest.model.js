const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const galleryrequestSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_username: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    gallery_business_id: {
        type: String,
        required: true
    },
    gallery_address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: true
        },
        region : {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    user_password: {
        type: String,
        required: true
    },
    gallery_agent: {
        agent_name: {
            type: String,
            required: true
        },
        agent_gender: {
            type: String,
            required: true
        },
        agent_position: {
            type: String,
            required: true
        },
        agent_birth: {
            day : {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            year: {
                type: Number,
                required: true
            }
        },
        agent_phone: {
            phone_number: {
                type: String,
                required: true
            },
            phone_prefix: {
                type: String,
                required: true
            },
        },
    },
    gallery_comment: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "new"
    },
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("GalleryRequest", galleryrequestSchema);
const GalleryRequest = new KaindaModel(tmpModel);
module.exports = GalleryRequest;
