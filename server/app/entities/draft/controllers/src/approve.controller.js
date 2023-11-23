const calculateLimitedEditions = require("@services/limitedEditions.service");
const ModelsService = require("@services/models.service");
const EmailService = require("@services/email.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");

async function editArtwork(draft, transaction)
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

    const draft_changes = draft.draft_container.critical_elements_changed;
    for(const change of draft_changes)
    {
        if(change.element === "artwork_artist")
        {
            let artistId, galleryArtistId;
            if(draft.draft_container.artwork_about.artwork_artist.artist_email)
            {
                artistId = null;
                galleryArtistId = draft.draft_container.artwork_about.artwork_artist._id;
            }
            else 
            {
                artistId = draft.draft_container.artwork_about.artwork_artist._id;
                galleryArtistId = draft.draft_container.artwork_about.artwork_artist.gallery_artist; 
            }
            artwork.artwork_about.artwork_artist = artistId;
            artwork.artwork_about.artwork_gallery_artist = galleryArtistId;
        }
        if(change.element === "artwork_size")
        {
            artwork.artwork_about.artwork_size = draft.draft_container.artwork_about.artwork_size;
        }
        if(change.element === "artwork_main_picture")
        {
            artwork.artwork_media.artwork_main_picture = draft.draft_container.artwork_media.artwork_main_picture;
        }
    }

    artwork.artwork_status = draft.draft_container.oldStatus;
    await artwork.save({ session: transaction.transaction });
    await Draft.deleteOne({ _id: draft._id }, { session: transaction.transaction });
    await transaction.commit();
    return artwork;    

}

/**
 * Approve a draft
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function approveDraft(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    let transaction = await Draft.transaction(DbService.get());
    try 
    {
        const draft = await Draft.findOne({ [Draft.modelId]: req.params.draft_id }, { transaction });
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
        if(draft.draft_status !== "pending")
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
            const artwork = await editArtwork(draft, transaction);
            return res.status(200).json(artwork);
        }

        const gallery = await draft.getGallery(transaction);
        const artist = await draft.getArtist(transaction);
        const galleryartist = artist?.gallery_artist ?? (await draft.getGalleryArtist(transaction));
        if(!galleryartist && !artist) 
        {
            throw new Draft.Exceptions.DraftBadRequestException({
                error_type: "BAD_REQUEST",
                error_message: "Draft must have an artist or a galleryartist",
                error_data: {
                    element: "draft_artist"
                }
            });
        }
        let construct = {
            ...draft.toJSON().draft_container,
            artwork_about: {
                ...draft.toJSON().draft_container.artwork_about,
                artwork_gallery: gallery?._id,
                artwork_artist: artist?._id,
                artwork_gallery_artist: galleryartist?._id
            },
            artwork_status: gallery.user_flags.onboarding_completed ? "available" : "unavailable"
        };
        // Modify artwork media
        if (construct.artwork_media.artwork_main_picture) 
        {
            construct.artwork_media.artwork_main_picture = {
                id: construct.artwork_media.artwork_main_picture.image_id.split("_")[1],
                image_id: construct.artwork_media.artwork_main_picture.image_id,
                image_original_data: construct.artwork_media.artwork_main_picture.image_original_data
            };
        }
        if (construct.artwork_media.artwork_secondary_pictures) 
        {
            construct.artwork_media.artwork_secondary_pictures = construct.artwork_media.artwork_secondary_pictures.map(picture => 
            {
                return {
                    id: picture.image_id.split("_")[1],
                    image_id: picture.image_id,
                    image_original_data: picture.image_original_data
                };
            });
        }
        if (construct.artwork_media.artwork_audio) 
        {
            construct.artwork_media.artwork_audio = {
                id: construct.artwork_media.artwork_audio.audio_id.split("_")[1],
                audio_id: construct.artwork_media.artwork_audio.audio_id,
                audio_original_data: construct.artwork_media.artwork_audio.audio_original_data
            };
        }
        // Calculate limited editions
        if(construct.artwork_about.artwork_limited_edition)
        {
            let height = construct.artwork_about.artwork_size.height;
            let length = construct.artwork_about.artwork_size.length;
            const unit = construct.artwork_about.artwork_size.unit;
            const price = construct.artwork_about.artwork_price;
            if(unit === "inches")
            {
                height = height * 2.54;
                length = length * 2.54;
            }   
            construct.artwork_limited_editions = calculateLimitedEditions(height, length, price);
        }
        // Calculate prelaunch promotion
        if(gallery && gallery.createdAt < new Date("2023-06-28T00:00:00.000Z")) 
        {
            let count = (await Artwork.findMany({ artwork_gallery: gallery._id }, { transaction })).length;
            if(count < 3) 
            {
                construct.artwork_flags = {
                    ...construct.artwork_flags,
                    prelaunch_promotion: true
                };
            }
        }
        const artwork = await Artwork.createOne(construct, { transaction });
        draft.draft_status = "approved";
        await draft.save({ session: transaction.transaction });
        // Update artist and gallery 
        if(artist)
        {
            const artistCount = await Artwork.subModel.countDocuments({ "artwork_about.artwork_artist": artist._id }, { transaction });
            artist.user_profile_info = {
                ...artist.user_profile_info,
                user_artworks : artistCount
            };
            await artist.save({ session: transaction.transaction });
        }
        if(gallery)
        {
            const galleryCount = await Artwork.subModel.countDocuments({ "artwork_about.artwork_gallery": gallery._id }, { transaction });
            gallery.user_profile_info = {
                ...gallery.user_profile_info,
                user_artworks : galleryCount
            };
            await gallery.save({ session: transaction.transaction });
        }
        await transaction.commit();
        res.status(201).json(artwork.toJSON());
        const user = await User.findOne({ _id: gallery._id });
        EmailService.send(EmailService.EmailTypes.DRAFT_APPROVED, {
            from: {
                name: "Suarte",
                address: "no-reply@suarte.art",
            },
            to: user.user_email,
        }, {
            gallery_name: gallery.user_name ?? gallery.user_username ?? "Gallery",
            artwork_title: draft.draft_container.artwork_about.artwork_title,
            artwork_image: artwork.artwork_media.artwork_main_picture.image_url + "/w=400",
            artist_name: draft.draft_container.artwork_about.artwork_artist.artist_name ?? draft.draft_container.artwork_about.artwork_artist.user_name ?? "Artist",
            artwork_medium: draft.draft_container.artwork_about.artwork_medium,
            artwork_size: `${draft.draft_container.artwork_about.artwork_size.length} x ${draft.draft_container.artwork_about.artwork_size.height} ${draft.draft_container.artwork_about.artwork_size.unit}`,
            artwork_price: draft.draft_container.artwork_about.artwork_price + " " + draft.draft_container.artwork_about.artwork_currency,
        });
        SocketService.submissionApproved(artwork_title, artist_name, construct.artwork_about.artwork_limited_edition);
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
    approveDraft
};