const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");

/**
 * Create new thought
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createThought(req, res) 
{
    const Thought = ModelsService.Models.Thought;
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        req.body.thought_creator = req.token_decoded.uid;
        req.body.thought_artwork = req.params.artwork_id;
        const thought = await Thought.createOne(req.body);
        const artwork = await Artwork.findById(thought.thought_artwork);
        const user = await User.findById(thought.thought_creator);
        const socketBody = {
            type: false,
            status: thought.thought_parent ? 1 : 0,
            subject: user.user_username,
            object: artwork.artwork_about.artwork_title,
            sbj_image: user.user_image.image_url + "/w=47",
            obj_image: artwork.artwork_media.artwork_main_picture.image_url + "/w=47",
        };
        if(thought.thought_parent == null){
            SocketService.sendMessage(artwork.artwork_about.artwork_gallery.user_email, socketBody);
        }
        else {
            const thought_parent = await Thought.findById(thought.thought_parent);
            const creator_parent = await User.findById(thought_parent.thought_creator);
            SocketService.sendMessage(creator_parent.user_email, socketBody);
        }

        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(201).json(thought.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createThought
};