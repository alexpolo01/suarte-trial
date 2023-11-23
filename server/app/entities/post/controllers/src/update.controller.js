const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
/**
 * Update post
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updatePost(req, res) 
{
    const Post = ModelsService.Models.Post;
    const User = ModelsService.Models.User;
    try 
    {
        const post = await Post.findById(req.params.post_id);
        if (!post)
        {
            throw Post.Exceptions.PostNotFoundException.fromTemplate();
        }
        post.post_container = req.body.post_container;
        if (req.body.validation)
        {
            req.body.post_status = "published";
        }
        else
        {
            req.body.post_status = "incomplete";
        }
        post.post_status = req.body.post_status;
        await post.save();
        
        const postJSON = post.toJSON();
        // Calculate if it is liked by the user
        let iLiked = false;
        if (req.token_decoded)
        {
            iLiked = await Post.PostLike.subModel.countDocuments({
                post: post._id,
                user: req.token_decoded.uid
            }) > 0;
        }

        // Increase the visit count
        Post.subModel.addVisit(post._id);

        // Get all the users in tags
        const users = await Promise.all(post.post_container.post_tags.map(async (userSchema) => 
        {
            const user = (await User.findById(userSchema._id)).toJSON();
            if(req.token_decoded?.uid)
            {
                user.im_following = await User.Follow.subModel.countDocuments({
                    follower : req.token_decoded.uid,
                    followee : user._id
                }) > 0;
                user.is_following_me = await User.Follow.subModel.countDocuments({
                    follower : user._id,
                    followee : req.token_decoded.uid
                }) > 0;
            }
            return user;
        }));

        post.post_container.post_tags = users;

        return res.status(200).json({
            ...postJSON,
            is_liked : iLiked
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updatePost
};