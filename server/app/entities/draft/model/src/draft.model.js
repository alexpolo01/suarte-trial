const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const ModelsService = require("@services/models.service");

const mongoose = DbService.get();

const draftSchema = new mongoose.Schema({
    gallery : {
        type: String,
        ref: "Gallery",
        required: true,
    },
    draft_container : {
        type: Object,
        required: true,
    },
    draft_status : {
        type: String,
        required: true,
        default: "incomplete",
        enum : [
            "incomplete",
            "pending",
            "changes_required",
            "approved",
        ],
    },
    draft_changes : {
        type: Object,
        required: false
    },
    draft_history : {
        type: Array,
        required: true,
        default: [],
    },
}, {
    timestamps: true,
});

draftSchema.methods.getGallery = async function(transaction) 
{
    const Gallery = ModelsService.Models.User.Gallery;
    return await Gallery.findOne({ _id : this.gallery }, { session: transaction?.transaction });
};

draftSchema.methods.getArtist = async function(transaction) 
{
    const Artist = ModelsService.Models.User.Artist;
    return await Artist.findOne({ 
        _id : this.draft_container.artwork_about.artwork_artist._id 
    }, { session: transaction?.transaction });
};

draftSchema.methods.getGalleryArtist = async function(transaction) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    return await GalleryArtist.findOne({ 
        _id : this.draft_container.artwork_about.artwork_artist._id 
    }, { session: transaction?.transaction });
};

const tmpModel = mongoose.model("Draft", draftSchema);
const Draft = new KaindaModel(tmpModel);
module.exports = Draft;