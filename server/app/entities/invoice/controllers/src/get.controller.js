const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all invoices
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllInvoices(req, res) 
{
    const Invoice = ModelsService.Models.Invoice;
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
        const response = await Invoice.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(invoice => invoice.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get invoice by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getInvoiceById(req, res) 
{
    const Invoice = ModelsService.Models.Invoice;
    try 
    {
        const invoice = await Invoice.findById(req.params.invoice_id);
        if (!invoice) 
        {
            throw new Invoice.Exceptions.InvoiceNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.invoice_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(invoice.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getAllInvoicesOfUser(req, res) 
{
    const Invoice = ModelsService.Models.Invoice;
    try 
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            sort : {
                createdAt : -1
            },
            customLabels : {
                docs : "data",
            }
        };

        const invoices = await Invoice.subModel.paginate({
            invoice_owner : req.token_decoded.uid
        }, options);

        invoices.current_balance =  0;
        invoices.number_of_movements = 0;

        return res.status(200).json(invoices);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllInvoices,
    getInvoiceById,
    getAllInvoicesOfUser
};