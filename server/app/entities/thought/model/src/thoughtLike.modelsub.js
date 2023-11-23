const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const thoughtlikeSchema = new mongoose.Schema({
    thought: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
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

const tmpModel = mongoose.model("ThoughtLike", thoughtlikeSchema);
const ThoughtLike = new KaindaModel(tmpModel);

ThoughtLike.isLiked = async function (thoughtId, userId) 
{
    const count = await tmpModel.countDocuments({ thought: thoughtId, user: userId });
    return count > 0;
};

ThoughtLike.like = async function (thoughtId, userId) 
{
    if (await ThoughtLike.isLiked(thoughtId, userId)) 
    {
        return;
    }
    return await ThoughtLike.createOne({ thought: thoughtId, user: userId });
};

ThoughtLike.unlike = async function (thoughtId, userId) 
{
    return await tmpModel.deleteOne({ thought: thoughtId, user: userId });
};

module.exports = ThoughtLike;
