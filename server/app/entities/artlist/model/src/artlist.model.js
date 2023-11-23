const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const Validators = require("@entities/artlist/validators");

const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema");

const artlistSchema = new mongoose.Schema({
    artlist_creator: { 
        type: String, 
        ref: "User",
        required: true,
        autopopulate: true,
    },
    artlist_title: {
        type: String,
        required: true,
        validate: {
            validator: Validators.title_lenght,
        }
    },
    artlist_description: {
        type: String,
        required: false,
        validate: {
            validator: Validators.description_lenght,
        }
    },
    artlist_image: {
        type: imageSchema,
    },
    artlist_artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
        default: [],
        autopopulate: true,
    }] 
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const tmpModel = mongoose.model("Artlist", artlistSchema);
const Artlist = new KaindaModel(tmpModel);
Artlist.ArtlistLike = require("./artlistLike.modelsub");
module.exports = Artlist;
