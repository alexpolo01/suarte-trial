const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const postlikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
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

const tmpModel = mongoose.model("PostLike", postlikeSchema);
const PostLike = new KaindaModel(tmpModel);

PostLike.isLiked = async function (postId, userId) 
{
    const count = await tmpModel.countDocuments({ post: postId, user: userId });
    return count > 0;
};

PostLike.like = async function (postId, userId) 
{
    if (await PostLike.isLiked(postId, userId)) 
    {
        return;
    }
    return await PostLike.createOne({ post: postId, user: userId });
};

PostLike.unlike = async function (postId, userId) 
{
    return await tmpModel.deleteOne({ post: postId, user: userId });
};

module.exports = PostLike;
