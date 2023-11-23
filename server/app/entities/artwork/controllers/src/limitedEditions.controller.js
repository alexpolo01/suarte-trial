const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const calculateLimitedEditions = require("@services/limitedEditions.service");
const EmailService = require("@services/email.service");
const SocketService = require("@services/socket.service");

/**
 * Request the activation of limited editions for an artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function requestLimitedEditions(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const artwork = await Artwork.findOne({
            _id : req.params.artwork_id,
            "artwork_about.artwork_gallery" : req.token_decoded.uid
        });

        if(!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        if(artwork.artwork_limited_editions)
        {
            throw new Artwork.Exceptions.ArtworkBadRequestException({
                error_type: "LIMITED_EDITIONS_ALREADY_ENABLED",
                error_message: req.params.artwork_id + " already has limited editions enabled",
                error_data: {
                    req: req.body
                }
            });
        }

        EmailService.sendRaw({
            from: "Suarte Automatic Email <limited-editions@suarte.art>",
            to: "fran@suarte.art",
            subject: "Limited Editions Request",
            html : "Limited editions request for artwork " + artwork.artwork_about.artwork_title + " by " + artwork.artwork_about.artwork_artist?.user_name + " (" + artwork.artwork_about.artwork_gallery.user_name + ")"
        });

        artwork.artwork_about.artwork_limited_edition = true;
        await artwork.save();
        return res.status(200).json(artwork);

    } 
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get all artworks with limited editions requested but not approved
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllLimitedEditionsRequests(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            customLabels : {
                docs : "data"
            },
        };
        const results = await Artwork.subModel.paginate({
            "artwork_about.artwork_limited_edition" : true,
            "artwork_limited_editions" : null,
        }, options);

        return res.status(200).json(results);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Approve the activation of limited editions for an artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function approveLimitedEditions(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const artwork = await Artwork.findOne({
            _id : req.params.artwork_id,
        });

        if(!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        if(artwork.artwork_limited_editions)
        {
            throw new Artwork.Exceptions.ArtworkBadRequestException({
                error_type: "LIMITED_EDITIONS_ALREADY_ENABLED",
                error_message: req.params.artwork_id + " already has limited editions enabled",
                error_data: {
                    req: req.body
                }
            });
        }

        let height = artwork.artwork_about.artwork_size.height;
        let length = artwork.artwork_about.artwork_size.length;
        if(artwork.artwork_about.artwork_size.unit === "inches")
        {
            height = height * 2.54;
            length = length * 2.54;
        }
        let limited_editions = calculateLimitedEditions(
            height,
            length,
            artwork.artwork_about.artwork_price,
        );

        if(limited_editions.error)
        {
            throw new Artwork.Exceptions.ArtworkBadRequestException({
                error_type: "LIMITED_EDITIONS_CALCULATION_ERROR",
                error_message: "Error calculating limited editions",
                error_data: {
                    req: req.body
                }
            });
        }

        artwork.artwork_limited_editions = limited_editions;

        // TODO: Send email to gallery

        await artwork.save();
        SocketService.sendNotificationArtwork(false, "limitedEditionAccepted", req.token_decoded.uid, artwork._id);
        return res.status(200).json(artwork);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Reject the activation of limited editions for an artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function rejectLimitedEditions(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const artwork = await Artwork.findOne({
            _id : req.params.artwork_id,
        });

        if(!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        if(artwork.artwork_limited_editions)
        {
            throw new Artwork.Exceptions.ArtworkBadRequestException({
                error_type: "LIMITED_EDITIONS_ALREADY_ENABLED",
                error_message: req.params.artwork_id + " already has limited editions enabled",
                error_data: {
                    req: req.body
                }
            });
        }

        artwork.artwork_limited_editions = null;
        artwork.artwork_about.artwork_limited_edition = false;
        await artwork.save();

        // TODO: Send email to gallery

        return res.status(200).json(artwork);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    requestLimitedEditions,
    getAllLimitedEditionsRequests,
    approveLimitedEditions,
    rejectLimitedEditions
};