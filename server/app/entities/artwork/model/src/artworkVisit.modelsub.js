const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const addressSchema = require("@entities/auxiliarSchemas/address.schema");

const artworkViewSchema = new mongoose.Schema(
    {
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            required: true,
            index: true,
            autopopulate: true,
        },
        user: {
            type: String,
            ref: "User",
            required: false,
            index: true,
            autopopulate: true,
        },
        location: {
            type: addressSchema,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const tmpModel = mongoose.model("ArtworkView", artworkViewSchema);
const ArtworkView = new KaindaModel(tmpModel);

ArtworkView.__deleteArtworkView = async function (artworkId) 
{
    await tmpModel.deleteOne({ artwork: artworkId });
};

module.exports = ArtworkView;
