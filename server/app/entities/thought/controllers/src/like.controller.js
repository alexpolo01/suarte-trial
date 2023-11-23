const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");

/**
 * Like thought
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function likeThought(req, res) 
{
    const Thought = ModelsService.Models.Thought;
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    try 
    {
        const like = await Thought.ThoughtLike.like(req.params.thought_id, req.token_decoded.uid);
        const thought = await Thought.findById(like.thought);
        console.log(thought);
        const artwork = await Artwork.findById(thought.thought_artwork);
        const user = await User.findById(like.user);
        const creator = await User.findById(thought.thought_creator);
        SocketService.sendMessage(creator.user_email, {
            type: false,
            status: thought.thought_parent ? 3 : 2,
            subject: user.user_username,
            object: artwork.artwork_about.artwork_title,
            sbj_image: user.user_image.image_url + "/w=47",
            obj_image: artwork.artwork_media.artwork_main_picture.image_url + "/w=47",
        })
        return res.status(200).json(like);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unlike thought
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unlikeThought(req, res) 
{
    const Thought = ModelsService.Models.Thought;
    try 
    {
        const unlike = await Thought.ThoughtLike.unlike(req.params.thought_id, req.token_decoded.uid);
        return res.status(200).json(unlike);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get liked thoughts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getLikedThoughts(req, res)
{
    const Thought = ModelsService.Models.Thought;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            },
            populate: {
                path: "thought_artwork",
            }
        };

        const pipeline = Thought.ThoughtLike.subModel.aggregate([
            {
                $match: { user: req.token_decoded.uid }
            },
            {
                $lookup: {
                    from: "thoughts",
                    localField: "thought",
                    foreignField: "_id",
                    as: "thought"
                }
            },
            {
                $unwind: "$thought"
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "thought.thought_creator",
                    foreignField: "_id",
                    as: "thought.thought_creator"
                }
            },
            {
                $unwind: "$thought.thought_creator"
            },
            {
                $lookup: {
                    from: "artworks",
                    localField: "thought.thought_artwork",
                    foreignField: "_id",
                    as: "thought.thought_artwork"
                }
            },
            {
                $unwind: "$thought.thought_artwork"
            },
            {
                $replaceRoot: { 
                    newRoot: "$thought" 
                }
            }
        ], options);
        const thoughts = await Thought.ThoughtLike.subModel.aggregatePaginate(pipeline, options);
        thoughts.data = await Promise.all(thoughts.data.map(async(thought) =>
        {
            thought.thought_likes_count = await Thought.ThoughtLike.subModel.countDocuments({ thought: thought._id });
            thought.is_liked = true;
            return thought;
        }));
        return res.status(200).json(thoughts);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    likeThought,
    unlikeThought,
    getLikedThoughts,
};