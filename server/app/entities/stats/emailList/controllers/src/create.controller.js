const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new emaillist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createEmailList(req, res) 
{
    const EmailList = ModelsService.Models.EmailList;
    try 
    {
        req.body.ip_address = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const emaillist = await EmailList.createOne(req.body);
        return res.status(201).json(emaillist.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createEmailList
};