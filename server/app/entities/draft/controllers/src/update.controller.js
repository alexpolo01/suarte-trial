/* eslint-disable no-empty */
const ModelsService = require("@services/models.service");
const EmailService = require("@services/email.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Update draft
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateDraft(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    const User = ModelsService.Models.User;
    try 
    {
        let draft = await Draft.findById(req.params.draft_id);
        if (!draft) 
        {
            throw Draft.Exceptions.DraftNotFoundException.fromTemplate(); 
        }
        draft.draft_history.push({
            draft_status: draft.draft_status,
            draft_container: draft.draft_container,
        });
        draft.draft_container = req.body.draft_container;
        draft.draft_status = "incomplete";
        if(!draft.gallery) 
        {
            draft.gallery = req.token_decoded.uid;
        }
        if (req.body.draft_container.validation?.shipping === true) 
        {
            draft.draft_status = "pending";
            const user = await User.findOne({ _id: req.token_decoded.uid });
            EmailService.send(EmailService.EmailTypes.DRAFT_REQUEST, {
                from: {
                    name: "Suarte",
                    address: "no-reply@suarte.art",
                },
                to: user.user_email,
            }, {
                gallery_name: user.user_name ?? user.user_username ?? "Gallery",
                artwork_title: draft.draft_container.artwork_about.artwork_title,
                artwork_image: `https://imagedelivery.net/hAeIC__6Aj746x0RFU1joA/${draft.draft_container.artwork_media.artwork_main_picture.file_hash}/w=400`,
                artist_name: draft.draft_container.artwork_about.artwork_artist.artist_name,
                artwork_medium: draft.draft_container.artwork_about.artwork_medium,
                artwork_size: `${draft.draft_container.artwork_about.artwork_size.length} x ${draft.draft_container.artwork_about.artwork_size.height} ${draft.draft_container.artwork_about.artwork_size.unit}`,
                artwork_price: draft.draft_container.artwork_about.artwork_price + " " + draft.draft_container.artwork_about.artwork_currency,
            }).catch(error => 
            {
                LogService.ErrorLogger.error(error); 
            });
        }
        await draft.save();
        return res.status(200).json(draft.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function updateOnChangesRequired(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    let transaction = await Draft.transaction(DbService.get());
    try 
    {
        const draft = await Draft.findById(req.params.draft_id, { transaction });
        if (!draft) 
        {
            throw new Draft.Exceptions.DraftNotFoundException();
        }
        const jsonified = {
            ...draft.toJSON().draft_container,
        };

        const aboutKeys = [
            "artwork_artist",
            "artwork_title",
            "artwork_description",
            "artwork_medium",
            "artwork_year",
            "artwork_size",
            "artwork_theme",
            "artwork_feeling",
            "artwork_color",
            "artwork_currency",
            "artwork_price",
            "artwork_limited_edition",
        ];

        const mediaKeys = [
            "artwork_main_picture",
            "artwork_secondary_pictures",
            "artwork_audio",
        ];

        const shippingKeys = [
            "artwork_shipping_own",
            "artwork_shipping_rest",
            "artwork_shipping_exceptions",
            "artwork_shipping_collector_can_pick_up",
        ];

        // Convert about data
        jsonified.artwork_about = { ...jsonified.artwork_about, ...req.body.after_changes };
        if (jsonified.artwork_about.artwork_height || jsonified.artwork_about.artwork_height == "") 
        {
            jsonified.artwork_about.artwork_size.height = jsonified.artwork_about.artwork_height;
        }
        if (jsonified.artwork_about.artwork_length || jsonified.artwork_about.artwork_length == "") 
        {
            jsonified.artwork_about.artwork_size.length = jsonified.artwork_about.artwork_length;
        }

        // Convert media data
        jsonified.artwork_media = { ...jsonified.artwork_media, ...req.body.after_changes };
        if (jsonified.artwork_media.artwork_secondary_pictures) 
        {
            jsonified.artwork_media.artwork_secondary_pictures = req.body.after_changes.artwork_secondary_pictures;
        }

        // Convert shipping data
        jsonified.artwork_shipping = { ...jsonified.artwork_shipping, ...req.body.after_changes };
        if (req.body.before_changes.artwork_shipping?.artwork_shipping_own) 
        {
            jsonified.artwork_shipping.artwork_shipping_own = req.body.after_changes.artwork_shipping_own;
        }
        if (req.body.before_changes.artwork_shipping?.artwork_shipping_own) 
        {
            jsonified.artwork_shipping.artwork_shipping_rest = req.body.after_changes.artwork_shipping_rest;
        }
        jsonified.artwork_shipping.artwork_shipping_exceptions = {
            ...draft.toJSON().draft_container.artwork_shipping.artwork_shipping_exceptions,
            ...req.body.after_changes.artwork_shipping_exceptions,
        };

        // Remove invalid keys from about
        for (let key of Object.keys(jsonified.artwork_about)) 
        {
            if (!aboutKeys.includes(key)) 
            {
                delete jsonified.artwork_about[key];
            }
        }

        // Remove invalid keys from media
        for (let key of Object.keys(jsonified.artwork_media)) 
        {
            if (!mediaKeys.includes(key)) 
            {
                delete jsonified.artwork_media[key];
            }
        }

        // Remove invalid keys from shipping
        for (let key of Object.keys(jsonified.artwork_shipping)) 
        {
            if (!shippingKeys.includes(key)) 
            {
                delete jsonified.artwork_shipping[key];
            }
        }

        const beforeShippingExceptionKeys = Object.keys(req.body.before_changes.artwork_shipping_exceptions ?? {});
        const afterShippingExceptionKeys = Object.keys(req.body.after_changes.artwork_shipping_exceptions ?? {});
        for (let i = 0; i < beforeShippingExceptionKeys.length; i++) 
        {
            const key = beforeShippingExceptionKeys[i];
            if (!afterShippingExceptionKeys.includes(key) && jsonified.artwork_shipping?.artwork_shipping_exceptions?.[key]) 
            {
                delete jsonified.artwork_shipping.artwork_shipping_exceptions[key];
            }
        }
        if (Object.keys(jsonified.artwork_shipping.artwork_shipping_exceptions).length === 0) 
        {
            jsonified.artwork_shipping.artwork_shipping_exceptions = null;
        }
        const body = {
            body: {
                draft_container: {
                    ...jsonified,
                    validation: {
                        about: true,
                        media: true,
                        shipping: true
                    }
                }
            }
        };
        try 
        {
            Draft.Middlewares.aboutRequiredKeys(body, res, () => 
            {
                throw new Error("About required keys passed");
            });
            return;
        }
        catch (error) 
        {
            
        }
        try 
        {
            await Draft.Middlewares.mediaRequiredKeys(body, res, () => 
            {
                throw new Error("Media required keys passed");
            });
            return;
        }
        catch (error) 
        {
        }
        try 
        {
            await Draft.Middlewares.shippingRequiredKeys(body, res, () => 
            {
                throw new Error("Shipping required keys passed");
            });
            return;
        }
        catch (error) 
        {
        }
        draft.draft_history.push({
            draft_status: draft.draft_status,
            draft_container: draft.draft_container,
        });
        draft.draft_status = "pending";
        draft.draft_container = jsonified;
        await draft.save({ session: transaction.transaction });
        await transaction.commit();
        return res.status(200).json(draft.toJSON());
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
    updateDraft,
    updateOnChangesRequired,
};