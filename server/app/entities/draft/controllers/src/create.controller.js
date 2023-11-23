const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new draft
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createDraft(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    let transaction = await Draft.transaction(DbService.get());
    try 
    {
        req.body.gallery = req.token_decoded.uid;
        const draft = await Draft.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(draft.toJSON());
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
    createDraft
};