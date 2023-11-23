const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete rating by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteRating(req, res) 
{
    const Rating = ModelsService.Models.Rating;
    let transaction = await Rating.transaction(DbService.get());
    try 
    {
        const rating = await Rating.deleteOne(req.params.rating_id ?? req.body.rating_id, { transaction });
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
    deleteRating
};