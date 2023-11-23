const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const internalcollectionSchema = new mongoose.Schema({
    collection_id : {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    collection_name : {
        type: String,
        required: true,
        index: true,
    },
    order: {
        type: Number,
        required: true,
        index: true,
    },
    order_mobile: {
        type: Number,
        required: true,
        index: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
        collection_url: {
            get: function () 
            {
                return this.collection_id;
            }
        }
    }
});

const tmpModel = mongoose.model("InternalCollection", internalcollectionSchema);
const InternalCollection = new KaindaModel(tmpModel);
InternalCollection.CollectionArtwork = require("./collectionArtwork.modelsub");
module.exports = InternalCollection;
