const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all contacts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllContacts(req, res) 
{
    const Contact = ModelsService.Models.Contact;
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
        const response = await Contact.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(contact => contact.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get contact by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getContactById(req, res) 
{
    const Contact = ModelsService.Models.Contact;
    try 
    {
        const contact = await Contact.findById(req.params.contact_id);
        if (!contact) 
        {
            throw new Contact.Exceptions.ContactNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.contact_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(contact.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllContacts,
    getContactById
};