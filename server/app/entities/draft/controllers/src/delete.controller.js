const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete draft by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteDraft(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    let transaction = await Draft.transaction(DbService.get());
    try 
    {
        const draft = await Draft.findById(req.params.draft_id, { transaction });
        if (!draft) 
        {
            throw Draft.Exceptions.DraftNotFoundException.fromTemplate();
        }
        const result = await Draft.deleteOne({ _id: draft._id }, { transaction });
        if (!result.deletedCount || result.deletedCount === 0) 
        {
            throw new Draft.Exceptions.DraftNotFoundException();
        }
        await transaction.commit();
        return res.status(200).json(draft.toJSON());
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
    deleteDraft
};