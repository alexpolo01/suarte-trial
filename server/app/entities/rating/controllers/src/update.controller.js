const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update rating
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateRating(req, res) 
{
    const Rating = ModelsService.Models.Rating;
    let transaction = await Rating.transaction(DbService.get());
    try 
    {
        const rating = await Rating.Controller.updateOne(
            req.body,
            {
                [Rating.modelId]: req.params.rating_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(rating.toJSON());
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
    updateRating
};