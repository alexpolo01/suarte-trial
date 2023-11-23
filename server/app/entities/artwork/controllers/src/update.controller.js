const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

function isMoreThanXPercentLower(a, b, x) 
{
    if (a < b || a == b) 
    {
        return false;
    }
    let difference = Math.abs(a - b);
    let percentageDifference = (difference / a) * 100;
    return percentageDifference > x;
}

/**
 * Update artwork
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    const Draft = ModelsService.Models.Draft;
    let transaction = await Artwork.transaction(DbService.get());
    try 
    {
        const artwork = await Artwork.findOne({ _id: req.params.artwork_id });
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

        const draft_container = req.body.draft_container;

        artwork.artwork_shipping = {
            ...artwork.artwork_shipping,
            ...draft_container.artwork_shipping
        };

        artwork.artwork_media = {
            ...artwork.artwork_media,
            ...draft_container.artwork_media,
            artwork_main_picture: artwork.artwork_media.artwork_main_picture
        };

        artwork.artwork_about = {
            ...artwork.artwork_about,
            ...draft_container.artwork_about,
            artwork_price: artwork.artwork_about.artwork_price,
            artwork_artist: artwork.artwork_about.artwork_artist,
            artwork_gallery: artwork.artwork_about.artwork_gallery,
            artwork_gallery_artist: artwork.artwork_about.artwork_gallery_artist,
            artwork_size: artwork.artwork_about.artwork_size,
        };

        if (artwork.artwork_status === "unavailable")
        {
            return res.status(400).json({
                error_type: "ARTWORK_EDIT_IN_PROGRESS",
                error_message: "Artwork is being edited by another user",
                error_data: {
                    req: req.body,
                    element: "artwork_generic_error"
                }
            });
        }

        if (artwork.artwork_about?.artwork_price != draft_container.artwork_about?.artwork_price)
        {
            // Initialize the flag for the artworks that have been uploaded before the price changes
            artwork.artwork_flags.price_changes = artwork.artwork_flags.price_changes ?? 2;

            if (artwork.artwork_flags.price_changes <= 0)
            {
                return res.status(400).json({
                    error_type: "NO_MORE_PRICE_MODIFICATION",
                    error_message: "No more price changes allowed",
                    error_data: {
                        req: req.body,
                        element: "artwork_price"
                    }
                });
            }

            if (isMoreThanXPercentLower(artwork.artwork_about.artwork_price, draft_container.artwork_about.artwork_price, 30))
            {
                return res.status(400).json({
                    error_type: "INVALID_PRICE_DOWNGRADE",
                    error_message: "Price is more than 30% different",
                    error_data: {
                        req: req.body,
                        element: "artwork_price"
                    }
                });
            }

            artwork.artwork_flags = {
                ...artwork.artwork_flags,
                price_changes: artwork.artwork_flags.price_changes - 1
            };
            artwork.artwork_about.artwork_price = parseInt(draft_container.artwork_about.artwork_price);

        }

        let criticalElementsChanged = [];
        if (artwork.artwork_about?.artwork_artist?._id?.toString() !== draft_container.artwork_about?.artwork_artist._id
            && artwork.artwork_about?.artwork_gallery_artist?._id?.toString() !== draft_container.artwork_about?.artwork_artist?._id)
        {
            criticalElementsChanged.push({
                element: "artwork_artist",
                old_value: artwork.artwork_about.artwork_artist?.toJSON() ?? artwork.artwork_about.artwork_gallery_artist?.toJSON(),
            });
        }
        if (artwork.artwork_about?.artwork_size.height != draft_container.artwork_about?.artwork_size.height || artwork.artwork_about?.artwork_size.length != draft_container.artwork_about?.artwork_size.length)
        {
            // Only is critical if the size is different by 5cm or more
            let length = parseFloat(draft_container.artwork_about.artwork_size.length);
            let height = parseFloat(draft_container.artwork_about.artwork_size.height);
            if (draft_container.artwork_about.artwork_size.unit === "inches")
            {
                length *= 2.54;
                height *= 2.54;
            }
            if (Math.abs(artwork.artwork_about.artwork_size.length - length) >= 5 || Math.abs(artwork.artwork_about.artwork_size.height - height) >= 5)
            {
                criticalElementsChanged.push({
                    element: "artwork_size",
                    old_value: artwork.artwork_about.artwork_size,
                });
            }
            else 
            {
                artwork.artwork_about.artwork_size = draft_container.artwork_about.artwork_size;
            }
        }
        if (artwork.artwork_media.artwork_main_picture?.image_id !== draft_container.artwork_media.artwork_main_picture?.image_id)
        {
            criticalElementsChanged.push({
                element: "artwork_main_picture",
                old_value: artwork.artwork_media.artwork_main_picture?.image_id,
            });
        }

        if (criticalElementsChanged.length > 0)
        {
            await Draft.createOne({
                gallery: artwork.artwork_about.artwork_gallery,
                draft_container: {
                    ...draft_container,
                    edit: true,
                    artwork_id: artwork._id,
                    critical_elements_changed: criticalElementsChanged,
                    oldStatus: artwork.artwork_status
                },
                draft_status: "pending"
            }, { transaction });
            artwork.artwork_status = "unavailable";
        }

        // Update the artwork
        await artwork.save({ session: transaction.transaction });
        await transaction.commit();
        return res.status(200).json({
            is_critical: criticalElementsChanged.length > 0,
            artwork: artwork.toJSON()
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateArtwork
};