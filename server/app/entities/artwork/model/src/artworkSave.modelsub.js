const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const artworksaveSchema = new mongoose.Schema({
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
        index: true
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("ArtworkSave", artworksaveSchema);
const ArtworkSave = new KaindaModel(tmpModel);

ArtworkSave.isSaved = async function (artworkId, userId) 
{
    const count = await tmpModel.countDocuments({ artwork: artworkId, user: userId });
    return count > 0;
};

ArtworkSave.save = async function (artworkId, userId) 
{
    if (await ArtworkSave.isSaved(artworkId, userId)) 
    {
        return;
    }
    return await ArtworkSave.createOne({ artwork: artworkId, user: userId });

};

ArtworkSave.unsave = async function (artworkId, userId) 
{
    await tmpModel.deleteOne({ artwork: artworkId, user: userId });
};

module.exports = ArtworkSave;
