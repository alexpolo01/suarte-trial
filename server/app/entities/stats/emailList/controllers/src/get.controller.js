const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all emaillists
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllEmailLists(req, res) 
{
    const EmailList = ModelsService.Models.EmailList;
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
        const response = await EmailList.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(emaillist => emaillist.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get emaillist by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getEmailListById(req, res) 
{
    const EmailList = ModelsService.Models.EmailList;
    try 
    {
        const emaillist = await EmailList.findById(req.params.emaillist_id);
        if (!emaillist) 
        {
            throw new EmailList.Exceptions.EmailListNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.emaillist_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(emaillist.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllEmailLists,
    getEmailListById
};