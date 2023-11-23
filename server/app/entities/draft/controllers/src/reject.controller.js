const ModelsService = require("@services/models.service");
const EmailService = require("@services/email.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");

async function rejectEditArtwork(draft, transaction)
{
    const Artwork = ModelsService.Models.Artwork;
    const Draft = ModelsService.Models.Draft;

    const artwork = await Artwork.findOne({ _id: draft.draft_container.artwork_id });
    if (!artwork)
    {
        throw new Artwork.Exceptions.ArtworkNotFoundException({
            error_type: "NOT_FOUND",
            error_message: draft.draft_container.artwork_id + " not found",
            error_data: {
                draft: draft
            }
        });
    }

    artwork.artwork_status = draft.draft_container.oldStatus;
    await artwork.save({ session: transaction.transaction });
    await Draft.deleteOne({ _id: draft._id }, { session: transaction.transaction });
    await transaction.commit();
    return artwork;  
}

/**
 * Reject a draft
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function rejectDraft(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    const User = ModelsService.Models.User;
    let transaction = await Draft.transaction(DbService.get());
    try 
    {
        const draft = await Draft.findOne({ _id: req.params.draft_id }, { transaction });
        if(!draft)
        {
            throw new Draft.Exceptions.DraftNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.draft_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        if (draft.draft_status !== "pending") 
        {
            throw new Draft.Exceptions.DraftBadRequestException({
                error_type: "BAD_REQUEST",
                error_message: "Draft must be pending",
                error_data: {
                    element: "draft_status"
                }
            });
        }

        if(draft.draft_container.edit)
        {
            const artwork = await rejectEditArtwork(draft, transaction);
            return res.status(200).json(artwork);
        }

        draft.draft_status = "changes_required";
        draft.draft_changes = req.body.draft_changes;
        await draft.save({ session: transaction.transaction });
        await transaction.commit();
        res.status(200).json(draft.toJSON());
        const gallery = await draft.getGallery();
        const user = await User.findOne({ _id: gallery._id });
        EmailService.send(EmailService.EmailTypes.DRAFT_CHANGES_REQUIRED, {
            from: {
                name: "Suarte",
                address: "support@suarte.art",
            },
            to: user.user_email,
        }, {
            gallery_name: gallery.user_name ?? gallery.user_username ?? "Gallery",
            artwork_title: draft.draft_container.artwork_about.artwork_title,
            artwork_image: `https://imagedelivery.net/hAeIC__6Aj746x0RFU1joA/${draft.draft_container.artwork_media.artwork_main_picture.image_id}/w=400`,
            artist_name: draft.draft_container.artwork_about.artwork_artist.user_name ?? draft.draft_container.artwork_about.artwork_artist.artist_name ?? "Artist",
            artwork_medium: draft.draft_container.artwork_about.artwork_medium,
            artwork_size: `${draft.draft_container.artwork_about.artwork_size.length} x ${draft.draft_container.artwork_about.artwork_size.height} ${draft.draft_container.artwork_about.artwork_size.unit}`,
            artwork_price: draft.draft_container.artwork_about.artwork_price + " " + draft.draft_container.artwork_about.artwork_currency,
            reason: draft.draft_changes,
        });
        SocketService.sendNotificationArtwork(false, "draftRejected", req.token_decoded.uid, draft.draft_container._id);
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
    rejectDraft
};