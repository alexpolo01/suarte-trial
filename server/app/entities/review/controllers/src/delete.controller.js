const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete review by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteReview(req, res) 
{
    const Review = ModelsService.Models.Review;
    let transaction = await Review.transaction(DbService.get());
    try 
    {
        const review = await Review.deleteOne(req.params.review_id ?? req.body.review_id, { transaction });
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
    deleteReview
};