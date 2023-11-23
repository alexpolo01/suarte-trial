const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all reviews
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllReviews(req, res) 
{
    const Review = ModelsService.Models.Review;
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
        const response = await Review.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(review => review.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get review by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getReviewById(req, res) 
{
    const Review = ModelsService.Models.Review;
    try 
    {
        const review = await Review.findById(req.params.review_id);
        if (!review) 
        {
            throw new Review.Exceptions.ReviewNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.review_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(review.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get all reviews for a gallery
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllReviewsFromGallery(req, res)
{
    const Review = ModelsService.Models.Review;
    try
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            sort : {
                createdAt : -1
            }
        };
        const reviews = await Review.paginate({
            gallery : req.params.gallery_id
        }, options);
        return res.status(200).json(reviews);
    }
    catch(error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllReviews,
    getReviewById,
    getAllReviewsFromGallery
};