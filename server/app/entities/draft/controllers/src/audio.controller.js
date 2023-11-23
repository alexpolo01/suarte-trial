const AudioService = require("@services/audio.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Request a new upload url for an audio file
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function uploadAudio(req, res) 
{
    const mongoose = DbService.get();
    try 
    {
        const db_id = new mongoose.Types.ObjectId();
        const audio_id = req.token_decoded.uid + "_" + db_id;
        const { url, id, expiration } = await AudioService.uploadAudioUrl(audio_id);
        return res.status(200).json({
            url,
            id,
            expiration
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    uploadAudio
};