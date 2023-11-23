const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new contact
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createContact(req, res) 
{
    const Contact = ModelsService.Models.Contact;
    let transaction = await Contact.transaction(DbService.get());
    try 
    {
        // If contact_email is not a valid email, throw an error
        if (!req.body.contact_email || !req.body.contact_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) 
        {
            throw new Contact.Exceptions.ContactBadRequestException({
                error_type: "INVALID_EMAIL",
                error_message: "The contact_email is not a valid email.",
                error_data: {
                    body: req.body,
                    element: "contact_email",
                    error_code: "INVALID_EMAIL"
                }
            });
        }
        const contact = await Contact.createOne(req.body, { transaction } );
        await transaction.commit();
        return res.status(201).json(contact.toJSON());
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
    createContact
};