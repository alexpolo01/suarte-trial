const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const artlistlikeSchema = new mongoose.Schema({
    artlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artlist",
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

const tmpModel = mongoose.model("ArtlistLike", artlistlikeSchema);
const ArtlistLike = new KaindaModel(tmpModel);

ArtlistLike.isLiked = async function (artlistId, userId) 
{
    const count = await tmpModel.countDocuments({ artlist: artlistId, user: userId });
    return count > 0;
};

ArtlistLike.like = async function (artlistId, userId) 
{
    if (await ArtlistLike.isLiked(artlistId, userId)) 
    {
        return;
    }
    return await ArtlistLike.createOne({ artlist: artlistId, user: userId });
};

ArtlistLike.unlike = async function (artlistId, userId) 
{
    return await tmpModel.deleteOne({ artlist: artlistId, user: userId });
};

module.exports = ArtlistLike;
