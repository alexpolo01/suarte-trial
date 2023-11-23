const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Create new review
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createReview(req, res) 
{
    const Review = ModelsService.Models.Review;
    try 
    {
        req.body.gallery = req.body.gallery_id;
        req.body.user = req.token_decoded.uid;
        const review = await Review.createOne(req.body);
        return res.status(201).json(review.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createReview
};