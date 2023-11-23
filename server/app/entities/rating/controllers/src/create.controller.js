const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");


/**
 * Create new rating
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createRating(req, res) 
{
    const Rating = ModelsService.Models.Rating;
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        const artwork = await Artwork.findById(req.params.artwork_id);
        const user = await User.findById(req.token_decoded.uid);
        const body = {
            rating_creator: req.token_decoded.uid,
            rating_artwork: req.params.artwork_id,
            rating_values: {
                emotions: req.body.emotions,
                style : req.body.style,
                time_travel: req.body.time_travel,
            }
        };
        const rating = await Rating.createOne(body);
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        
        if(artwork.artwork_about.artwork_gallery){
            SocketService.sendMessage(artwork.artwork_about.artwork_gallery.user_email, {
                type: false,
                status: 6,
                subject: user.user_username,
                object: artwork.artwork_about.artwork_title,
                sbj_image: user.user_image.image_url + "/w=47",
                obj_image: artwork.artwork_media.artwork_main_picture.image_url + "/w=47",
            });
        }
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(201).json(rating.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createRating
};