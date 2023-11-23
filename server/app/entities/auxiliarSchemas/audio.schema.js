const DbService = require("@services/db.service");
const mongoose = DbService.get();

const config = require("config");

const audioSchema = new mongoose.Schema({
    audio_id: {
        type: String,
    },
    audio_original_data: {
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
        audio_url: {
            get: function () 
            {
                return `${config.get("cloudflare.bucket.access_url")}/${this.audio_id}`;
            }
        },
    }
});

module.exports = audioSchema;