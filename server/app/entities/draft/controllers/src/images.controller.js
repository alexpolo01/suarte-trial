const ImageService = require("@services/image.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");

/**
 * Create new URL for direct upload image
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function uploadImage(req, res) 
{
    const mongoose = DbService.get();
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        const db_id = new mongoose.Types.ObjectId();
        const image_id = req.token_decoded.uid + "_" + db_id;
        const url = await ImageService.uploadImageUrl(image_id);
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(201).json({ 
            ...url 
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    uploadImage,
};