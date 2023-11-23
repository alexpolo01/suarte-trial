const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");

/**
 * Suarte World
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function suarteWorld(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    const query = {};
    query["artwork_status"] = {
      $nin: ["sold", "unavailable"],
    };
    try
    {
        const artworks = await SearchService.suarteWorld(req, Artwork);
        return res.status(200).json(artworks);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
} 

module.exports = {
    suarteWorld
};