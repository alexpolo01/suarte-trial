const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const ratingSchema = new mongoose.Schema(
    {
        rating_creator: {
            type: String,
            ref: "User",
            required: true,
            index: true,
        },
        rating_artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            required: true,
            index: true,
        },
        rating_values: {
            emotions: {
                type: Number,
                required: true,
            },
            style: {
                type: Number,
                required: true,
            },
            time_travel: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const tmpModel = mongoose.model("Rating", ratingSchema);
const Rating = new KaindaModel(tmpModel);

Rating.__deleteRatingByArtworkId = async function (artworkId) 
{
    await tmpModel.deleteOne({ rating_artwork: artworkId });
};
module.exports = Rating;
