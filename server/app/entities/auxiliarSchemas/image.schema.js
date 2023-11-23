const DbService = require("@services/db.service");
const mongoose = DbService.get();

const config = require("config");

const imageSchema = new mongoose.Schema({
    image_id: {
        type: String,
    },
    image_original_data: {
        type: Object,
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    virtuals: {
        image_url: {
            get: function () 
            {
                return `https://suarte.art/cdn-cgi/imagedelivery/${config.get("cloudflare.images.account_hash")}/${this.image_id}/`;
            }
        },
    }
});

module.exports = imageSchema;