const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all thoughts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllThoughts(req, res) 
{
    const Thought = ModelsService.Models.Thought;
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
        const response = await Thought.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(thought => thought.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get thought by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getThoughtById(req, res) 
{
    const Thought = ModelsService.Models.Thought;
    try 
    {
        const thought = await Thought.findById(req.params.thought_id);
        if (!thought) 
        {
            throw new Thought.Exceptions.ThoughtNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.thought_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(thought.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getThoughtsByArtwork(req, res)
{
    const Thought = ModelsService.Models.Thought;
    const ThoughtLike = Thought.ThoughtLike;
    try 
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: { createdAt: -1 },
            customLabels: {
                docs: "data",
            },
            populate: {
                path: "thought_creator",
            }
        };

        const query = {
            thought_artwork: req.params.artwork_id,
            thought_parent: null
        };

        let referrerThought = null;
        if (req.query.thought && options.offset == 0)
        {
            referrerThought = await Thought.findById(req.query.thought);
            await referrerThought.populate("thought_creator");
            if (!referrerThought)
            {
                referrerThought = null;
            }
            options.limit = options.limit - 1;
        }

        if (req.query.thought)
        {
            query._id = { $ne: referrerThought ? referrerThought._id : req.query.thought };
        }

        let thoughts = await Thought.subModel.paginate(query, options);

        if (referrerThought)
        {
            thoughts.data = [referrerThought, ...thoughts.data];
        }

        thoughts.data = await Promise.all(thoughts.data.map(async thought => 
        {
            thought = thought.toJSON();
            thought.like_count = await ThoughtLike.subModel.countDocuments({ thought: thought._id });
            if (req.token_decoded)
            {
                thought.is_liked = !!(await ThoughtLike.subModel.exists({ thought: thought._id, user: req.token_decoded._id }));
            }
            thought.children_count = await Thought.subModel.countDocuments({ thought_parent: thought._id });
            return thought;
        }));

        // Convert the thoughts structure to a plain array with the children intercalated
        // const thoughtsArray = [];
        // thoughts.data.forEach(thought => 
        // {
        //     thoughtsArray.push(thought);
        //     thought.children.forEach(child => 
        //     {
        //         thoughtsArray.push(child);
        //     });
        // });
        // thoughts.data = thoughtsArray;

        return res.status(200).json(thoughts);

    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getRepliesByThought(req, res)
{
    const Thought = ModelsService.Models.Thought;
    const ThoughtLike = Thought.ThoughtLike;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: { createdAt: 1 },
            customLabels: {
                docs: "data",
            },
            populate: {
                path: "thought_creator",
            }
        };

        const thoughts = await Thought.subModel.paginate({
            thought_parent: req.params.thought_id
        }, options);

        thoughts.data = await Promise.all(thoughts.data.map(async thought => 
        {
            thought = thought.toJSON();
            thought.like_count = await ThoughtLike.subModel.countDocuments({ thought: thought._id });
            if (req.token_decoded)
            {
                thought.is_liked = !!(await ThoughtLike.subModel.exists({ thought: thought._id, user: req.token_decoded._id }));
            }
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

async function getThoughtsByUser(req, res)
{
    const Thought = ModelsService.Models.Thought;
    const ThoughtLike = Thought.ThoughtLike;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: { createdAt: -1 },
            customLabels: {
                docs: "data",
            },
            populate: {
                path: "thought_artwork",
                select: "artwork_media artwork_about _id"
            }
        };

        const thoughts = await Thought.subModel.paginate({
            thought_creator: req.params.user_id,
            thought_parent: null
        }, options);

        const creator = await ModelsService.Models.User.findById(req.params.user_id);

        thoughts.data = await Promise.all(thoughts.data.map(async (thought) =>
        {
            thought = thought.toJSON();
            thought.thought_creator = creator;
            thought.thought_likes_count = await ThoughtLike.subModel.countDocuments({ thought: thought._id });

            if (req.token_decoded)
            {
                thought.is_liked = !!(await ThoughtLike.subModel.exists({
                    thought: thought._id,
                    user: req.token_decoded._id
                }));
            }

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
    getAllThoughts,
    getThoughtById,
    getThoughtsByArtwork,
    getRepliesByThought,
    getThoughtsByUser
};