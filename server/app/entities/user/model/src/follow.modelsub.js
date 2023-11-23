const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true,
        index: true,
        ref: "User",
    },
    followee: {
        type: String,
        required: true,
        index: true,
        ref: "User",
    },
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("Follow", followSchema);
const Follow = new KaindaModel(tmpModel);
module.exports = Follow;

Follow.isFollowing = async (follower, followee) => 
{
    const count = await tmpModel.countDocuments({ follower, followee });
    return count > 0;
};

Follow.follow = async (follower, followee) => 
{
    const isFollowing = await Follow.isFollowing(follower, followee._id);
    if (isFollowing) 
    {
        return isFollowing;
    }
    const follow = await new tmpModel({ follower, followee });
    await follow.save();
    const count = await tmpModel.countDocuments({ follower, followee });
    followee.user_profile_info.user_inspiring = count;
    await followee.save();
    return follow;
};

Follow.unfollow = async (follower, followee) => 
{
    const result = await tmpModel.deleteOne({ follower, followee });
    if (result.deletedCount !== 0) 
    {
        const count = await tmpModel.countDocuments({ follower, followee });
        followee.user_profile_info.user_inspiring = count;
        await followee.save();
    }
    return result;
};

Follow.getFollowers = async (followee) => 
{
    return await tmpModel.find({ followee });
};
