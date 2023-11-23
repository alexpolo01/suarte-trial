const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");

/**
 * Create new artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createArtlist(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        req.body.artlist_creator = req.token_decoded.uid;
        const artlist = await Artlist.createOne(req.body);
        await artlist.populate("artlist_creator");
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(201).json(artlist.toJSON());
    }
    catch (error) 
    {
        let customError = error;
        LogService.ErrorLogger.error(customError);
        if(customError instanceof DbService.mongoose.Error.ValidationError) 
        {
            customError = error.errors[Object.keys(error.errors)[0]].reason;
        }
        ExceptionService.handle(customError, res);
    }
}

module.exports = {
    createArtlist
};