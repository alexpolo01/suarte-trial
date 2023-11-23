const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete contact by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteContact(req, res) 
{
    const Contact = ModelsService.Models.Contact;
    let transaction = await Contact.transaction(DbService.get());
    try 
    {
        const contact = await Contact.Controller.__deleteContact(req.params.contact_id ?? req.body.contact_id, { transaction });
        await transaction.commit();
        return res.status(200).json(contact.toJSON());
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
    deleteContact
};