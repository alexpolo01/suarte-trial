const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Create new post
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createPost(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        if(req.body.validation)
        {
            req.body.post_status = "published";
        }
        else
        {
            req.body.post_status = "incomplete";
        }
        req.body.gallery = req.token_decoded.uid;
        const post = await Post.createOne(req.body);
        return res.status(201).json(post.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createPost
};