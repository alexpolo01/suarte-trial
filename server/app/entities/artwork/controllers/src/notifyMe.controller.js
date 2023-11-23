const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Add an email to the notify me list
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function notifyMe(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const artwork = await Artwork.findOne({
            _id: req.params.artwork_id
        });

        if (!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        artwork.artwork_about.artwork_gallery.gallery_notify_me_when_opens.push({
            email: req.body.user_email,
            artwork: artwork._id
        });

        await artwork.artwork_about.artwork_gallery.save();

        return res.status(200).json({});
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    notifyMe
};