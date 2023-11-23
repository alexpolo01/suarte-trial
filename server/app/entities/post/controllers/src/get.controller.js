const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Get all posts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllPosts(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key]; 
            } 
        });
        const response = await Post.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(post => post.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get post by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getPostById(req, res) 
{
    const Post = ModelsService.Models.Post;
    const User = ModelsService.Models.User;
    const mongoose = DbService.mongoose;
    try 
    {
        try 
        {
            new mongoose.Types.ObjectId(req.params.post_id);
        } 
        catch (error) 
        {
            throw new Post.Exceptions.PostNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.post_id + " not found",
                error_data: {
                    req: req.body
                }
            }, 200); // 200 because frontend issues
        }
        const post = await Post.findById(req.params.post_id);
        if (!post) 
        {
            throw new Post.Exceptions.PostNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.post_id + " not found",
                error_data: {
                    req: req.body
                }
            }, 200); // 200 because frontend issues
        }

        // Calculate if it is liked by the user
        let iLiked = false;
        if(req.token_decoded)
        {
            iLiked = await Post.PostLike.subModel.countDocuments({
                post : post._id,
                user : req.token_decoded.uid
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
            ...post.toJSON(),
            is_liked : iLiked
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getIncompletePosts(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            sort : {
                created_at : -1
            },
            customLabels : {
                docs : "data",
            }
        };
        
        const posts = await Post.subModel.paginate({
            gallery : req.token_decoded.uid,
            post_status : "incomplete"
        }, options);

        return res.status(200).json(posts);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getPostsByGalleryId(req, res) 
{
    const Post = ModelsService.Models.Post;
    try 
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            sort : {
                created_at : -1
            },
            customLabels : {
                docs : "data",
            }
        };

        const posts = await Post.subModel.paginate({
            gallery : req.params.gallery_id,
            post_status : "published"
        }, options);

        const response = await Promise.all(posts.data.map(async post => 
        {
            let postLikes = await Post.PostLike.subModel.countDocuments({
                post : post._id,
            });
            let iLiked = false;
            if(req.token_decoded) 
            {
                iLiked = await Post.PostLike.subModel.exists({
                    post : post._id,
                    user : req.token_decoded.uid
                });
            }
            post = post.toJSON();
            post.post_likes = postLikes;
            post.i_liked = iLiked;
            return post;
        }));

        posts.data = response;

        return res.status(200).json(posts);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getIncompletePosts,
    getPostsByGalleryId
};