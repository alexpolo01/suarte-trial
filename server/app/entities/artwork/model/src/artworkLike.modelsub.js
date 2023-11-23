const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const artworklikeSchema = new mongoose.Schema({
    artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
        index: true,
        autopopulate: true
    },
    user: {
        type: String,
        ref: "User",
        required: true,
        index: true,
        autopopulate: true
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("ArtworkLike", artworklikeSchema);
const ArtworkLike = new KaindaModel(tmpModel);

ArtworkLike.isLiked = async function (artworkId, userId) 
{
    const count = await tmpModel.countDocuments({ artwork: artworkId, user: userId });
    return count > 0;
};

ArtworkLike.like = async function (artworkId, userId) 
{
    if (await ArtworkLike.isLiked(artworkId, userId)) 
    {
        return;
    }
    return await ArtworkLike.createOne({ artwork: artworkId, user: userId });

};

ArtworkLike.unlike = async function (artworkId, userId) 
{
    await tmpModel.deleteOne({ artwork: artworkId, user: userId });
};

module.exports = ArtworkLike;
