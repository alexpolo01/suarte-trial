const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const postSchema = new mongoose.Schema({
    gallery: {
        type: String,
        ref: "Gallery",
        required: true,
        autopopulate: true,
    },
    post_container: {
        type: Object,
        required: true
    },
    post_status: {
        type: String,
        required: true,
        default: "incomplete",
        enum: [
            "incomplete",
            "published",
        ],
    },
    post_visits: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

postSchema.statics.addVisit = async function (postId)
{
    await Post.subModel.updateOne({ _id: postId }, { $inc: { post_visits: 1 } });
};

const tmpModel = mongoose.model("Post", postSchema);
const Post = new KaindaModel(tmpModel);
Post.PostLike = require("./postLike.modelsub");
module.exports = Post;
