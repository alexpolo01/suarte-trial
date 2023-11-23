const DbService = require("@services/db.service");
const mongoose = DbService.get();

const userAddress = require("@entities/auxiliarSchemas/userAddress.schema");

const artistSchema = new mongoose.Schema({
    gallery_artist : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GalleryArtist",
        autopopulate: true,
    },
    user_collection : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    user_addresses: {
        type: [userAddress],
    },
});

module.exports = artistSchema;