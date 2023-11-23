const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update review
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateReview(req, res) 
{
    const Review = ModelsService.Models.Review;
    let transaction = await Review.transaction(DbService.get());
    try 
    {
        const review = await Review.Controller.updateOne(
            req.body,
            {
                [Review.modelId]: req.params.review_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(review.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateReview
};