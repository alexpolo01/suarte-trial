const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");

/**
 * Search for artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function searchArtlist(req, res)
{
    const Artlist = ModelsService.Models.Artlist;
    try
    {
        const artlist = await SearchService.searchArtlists(req, Artlist);
        return res.status(200).json(artlist);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    searchArtlist
};