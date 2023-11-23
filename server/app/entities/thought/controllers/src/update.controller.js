const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update thought
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateThought(req, res) 
{
    const Thought = ModelsService.Models.Thought;
    let transaction = await Thought.transaction(DbService.get());
    try 
    {
        const thought = await Thought.Controller.updateOne(
            req.body,
            {
                [Thought.modelId]: req.params.thought_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(thought.toJSON());
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
    updateThought
};