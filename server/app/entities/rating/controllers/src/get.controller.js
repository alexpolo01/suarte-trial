const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Get all ratings
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllRatings(req, res) 
{
    const Rating = ModelsService.Models.Rating;
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
        const response = await Rating.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(rating => rating.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get rating by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getRatingById(req, res) 
{
    const Rating = ModelsService.Models.Rating;
    try 
    {
        const rating = await Rating.findById(req.params.rating_id);
        if (!rating) 
        {
            throw new Rating.Exceptions.RatingNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.rating_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(rating.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getRatingsOfArtwork(req, res)
{
    const Rating = ModelsService.Models.Rating;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: {
                createdAt: -1
            },
            customLabels: {
                docs: "data",
            },
            populate: [
                {
                    path: "rating_creator",
                }
            ]
        };

        const query = {
            rating_artwork: req.params.artwork_id,
        };

        if (req.token_decoded) 
        {
            query.rating_creator = {
                $ne: req.token_decoded.uid
            };
        }

        const ratings = await Rating.subModel.paginate(query, options);

        let my_rating = null;
        if (req.token_decoded && req.query.offset !== 0)
        {
            my_rating = await Rating.findOne({
                rating_artwork: req.params.artwork_id,
                rating_creator: req.token_decoded.uid
            });
            ratings.my_rating = my_rating;
        }

        if (!req.query.offset || req.query.offset === 0) 
        {
            const pipeline = [
                {
                    $match: {
                        rating_artwork: ratings?.docs?.[0]?.rating_artwork ?? new DbService.mongoose.Types.ObjectId(req.params.artwork_id)
                    }
                },
                {
                    $group: {
                        _id: null,  // grouping all documents together
                        avgEmotions: { $avg: "$rating_values.emotions" },
                        avgStyle: { $avg: "$rating_values.style" },
                        avgTimeTravel: { $avg: "$rating_values.time_travel" },
                    }
                }
            ];
            const result = await Rating.subModel.aggregate(pipeline);
            ratings.emotions_average = result[0]?.avgEmotions ?? 50;
            ratings.style_average = result[0]?.avgStyle ?? 50;
            ratings.time_travel_average = result[0]?.avgTimeTravel ?? 50;
        }

        return res.status(200).json(ratings);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getRatingsOfUser(req, res)
{
    const Rating = ModelsService.Models.Rating;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            sort: {
                createdAt: -1
            },
            customLabels: {
                docs: "data",
            },
            populate: [
                {
                    path: "rating_artwork",
                }
            ]
        };

        const query = {
            rating_creator: req.params.user_id,
        };

        const ratings = await Rating.subModel.paginate(query, options);
        if (req.token_decoded)
        {
            const data = await Promise.all(ratings.data.map(async (rating) => 
            {
                const myRating = await Rating.findOne({
                    rating_creator: req.token_decoded.uid,
                    rating_artwork: rating.rating_artwork._id
                });
                rating = rating.toJSON();
                rating.my_rating = myRating;
                return rating;
            }));
            ratings.data = data;
        }

        if (req.token_decoded && req.token_decoded.uid === req.params.user_id)
        {
            ratings.data = ratings.data.map(rating => 
            {
                rating.my_rating = {
                    ...rating
                };
                return rating;
            });
        }

        return res.status(200).json(ratings);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllRatings,
    getRatingById,
    getRatingsOfArtwork,
    getRatingsOfUser
};