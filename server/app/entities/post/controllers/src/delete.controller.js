const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Delete post by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deletePost(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const post = await Post.deleteOne({
            _id: req.params.post_id,
        });
        await Post.PostLike.deleteMany({ post: post._id });
        return res.status(200).json(post);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deletePost
};