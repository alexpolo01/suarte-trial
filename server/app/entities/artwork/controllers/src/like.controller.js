const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");

/**
 * Like artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function likeArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        const like = await Artwork.ArtworkLike.like(req.params.artwork_id, req.token_decoded.uid);
        const artwork = await Artwork.findById(req.params.artwork_id);
        const user = await User.findById(req.token_decoded.uid);
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if(artwork.artwork_about.artwork_gallery){
            SocketService.sendMessage(artwork.artwork_about.artwork_gallery.user_email, {
                type: false,
                status: 4,
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
        return res.status(200).json(like);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unlike artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unlikeArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const unlike = await Artwork.ArtworkLike.unlike(req.params.artwork_id, req.token_decoded.uid);
        return res.status(200).json(unlike);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get liked artworks
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getLikedArtworks(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            }
        };

        const query = {
            user: req.token_decoded.uid
        };

        const artworks = await Artwork.ArtworkLike.subModel.paginate(query, options);
        artworks.data = artworks.data.map(artwork => artwork.artwork);
        return res.status(200).json(artworks);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    likeArtwork,
    unlikeArtwork,
    getLikedArtworks,
};