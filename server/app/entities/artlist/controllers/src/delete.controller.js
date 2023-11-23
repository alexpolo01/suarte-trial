const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Delete artlist by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteArtlist(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        let artlist = req.artlist;
        await Artlist.deleteOne({ _id: artlist._id ?? req.params.artlist_id });
        await Artlist.deleteMany({ artlist: artlist._id ?? req.params.artlist_id });
        return res.status(200).json(artlist.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deleteArtlist
};