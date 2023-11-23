const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const collectionArtworkSchema = new mongoose.Schema({
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternalCollection",
        required: true,
    },
    artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
        autopopulate: true,
    },
    order: {
        type: Number
    },
    metadata : {
        type: Object,
    },
}, {
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function (doc, ret) 
        {
            ret = {
                ...ret.artwork,
                metadata : ret.metadata,
                collection: ret.collection,
            };
            return ret;
        }
    },
    toObject: { 
        virtuals: true,
        transform: function (doc, ret) 
        {
            ret = {
                ...ret.artwork,
                metadata: ret.metadata,
                collection: ret.collection,
            };
            return ret;
        }
    },
});

const tmpModel = mongoose.model("CollectionArtwork", collectionArtworkSchema);
const CollectionArtwork = new KaindaModel(tmpModel);
module.exports = CollectionArtwork;