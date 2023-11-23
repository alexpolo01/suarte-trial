const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Like post
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function likePost(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const like = await Post.PostLike.like(req.params.post_id, req.token_decoded.uid);
        return res.status(200).json(like);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unlike post
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unlikePost(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const unlike = await Post.PostLike.unlike(req.params.post_id, req.token_decoded.uid);
        return res.status(200).json(unlike);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get liked posts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getLikedPosts(req, res)
{
    const Post = ModelsService.Models.Post;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            }
        };
        const pipeline = Post.PostLike.subModel.aggregate([
            {
                $match: { user: req.token_decoded.uid }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "post",
                    foreignField: "_id",
                    as: "post"
                }
            },
            {
                $unwind: "$post"
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "post.gallery",
                    foreignField: "_id",
                    as: "post.gallery"
                }
            },
            {
                $unwind: "$post.gallery"
            },
            {
                $replaceRoot: { 
                    newRoot: "$post" 
                }
            }
        ], options);
        const posts = await Post.PostLike.subModel.aggregatePaginate(pipeline, options);
        return res.status(200).json(posts);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    likePost,
    unlikePost,
    getLikedPosts,
};