const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const galleryartistSchema = new mongoose.Schema({
    artist_name : {
        type: String,
        required: true,
        index : "text"
    },
    artist_email : {
        type: String,
        required: true
    },
    artist_nationality : {
        type: String,
        required: true
    },
    artist_birth : {
        type: String,
        required: true
    },
    artist_death : {
        type: String,
        required: false 
    },
    artist_should_request_email : {
        type: Boolean,
        required: true,
        default: false
    },
    artist : { 
        type: String, 
        ref: "User",
        required: false,
        autopopulate: true
    },
    gallery : {
        type: String,
        ref: "User",
        required: true,
        autopopulate: true
    },
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("GalleryArtist", galleryartistSchema);
const GalleryArtist = new KaindaModel(tmpModel);
module.exports = GalleryArtist;
