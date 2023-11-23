const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update invoice
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateInvoice(req, res) 
{
    const Invoice = ModelsService.Models.Invoice;
    let transaction = await Invoice.transaction(DbService.get());
    try 
    {
        const invoice = await Invoice.Controller.updateOne(
            req.body,
            {
                [Invoice.modelId]: req.params.invoice_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(invoice.toJSON());
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
    updateInvoice
};