const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const { missingFieldsResponse } = require("kainda");

/**
 * Check if the required keys are present in the request body
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @param {Array} required_keys
 * @returns {void}
 */
async function checkRequiredKeys(req, res, next, required_keys = ModelsService.Models.Draft.create_required_keys) 
{
    if (required_keys.length === 0) 
    {
        return next();
    }
    let arrayOfKeys = [
        required_keys
    ];
    let response = missingFieldsResponse(arrayOfKeys, req.body);
    if (Object.keys(response).length > 0) 
    {
        return res.status(400).json(response);
    }
    next();
}

/**
 * Check if the required keys are present in the request body for the artwork_about object
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function aboutRequiredKeys(req, res, next) 
{

    const Draft = ModelsService.Models.Draft;

    if (req.body.draft_container?.validation?.about !== true) 
    {
        return next();
    }

    let notNullableElements = [
        "artwork_artist",
        "artwork_artist._id",
        "artwork_title",
        "artwork_description",
        "artwork_medium",
        "artwork_theme",
        "artwork_color",
        "artwork_feeling",
        "artwork_year",
        "artwork_size",
        "artwork_size.unit",
        "artwork_size.height",
        "artwork_size.length",
        "artwork_currency",
        "artwork_price",
    ];

    req.body.draft_container.artwork_about.artwork_size.height = req.body.draft_container.artwork_about.artwork_size.height.replace(",", ".");
    req.body.draft_container.artwork_about.artwork_size.length = req.body.draft_container.artwork_about.artwork_size.length.replace(",", ".");

    let response = missingFieldsResponse([notNullableElements], req.body.draft_container.artwork_about);

    if (response.error_data?.element?.startsWith("artwork_artist")) 
    {
        response.error_data.element = "artwork_artist";
    }

    if (response.error_data?.element?.startsWith("artwork_size")) 
    {
        response.error_data.element = "artwork_size";
    }

    if (Object.keys(response).length > 0) 
    {
        return res.status(400).json(response);
    }

    try 
    {
        await Draft.Validators.AboutValidation(req.body.draft_container.artwork_about);
    }
    catch (error) 
    {
        return ExceptionService.handle(error, res);
    }

    next();

}

/**
 * Check if the required keys are present in the request body for the artwork_media object
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function mediaRequiredKeys(req, res, next) 
{

    const Draft = ModelsService.Models.Draft;

    if (req.body.draft_container?.validation?.media !== true) 
    {
        return next();
    }

    let notNullableElements = [
        "artwork_main_picture",
    ];

    let response = missingFieldsResponse([notNullableElements], req.body.draft_container.artwork_media);

    if (Object.keys(response).length > 0) 
    {
        return res.status(400).json(response);
    }

    try 
    {
        await Draft.Validators.MediaValidation(req.body.draft_container.artwork_media);
    }
    catch (error) 
    {
        return ExceptionService.handle(error, res);
    }

    next();

}

/**
 * Check if the required keys are present in the request body for the artwork_shipping object
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function shippingRequiredKeys(req, res, next) 
{

    const Draft = ModelsService.Models.Draft;

    if (req.body.draft_container?.validation?.shipping !== true) 
    {
        return next();
    }

    let notNullableElements = [
        "artwork_shipping_own",
        "artwork_shipping_rest",
    ];

    if (req.body.draft_container.artwork_shipping.artwork_shipping_own.payer !== "You") 
    {
        notNullableElements.push("artwork_shipping_own.currency");
        notNullableElements.push("artwork_shipping_own.price");
    }
    if (req.body.draft_container.artwork_shipping.artwork_shipping_rest.payer !== "You") 
    {
        notNullableElements.push("artwork_shipping_rest.currency");
        notNullableElements.push("artwork_shipping_rest.price");
    }

    if (req.body.draft_container.artwork_shipping.artwork_shipping_exceptions && Object.keys(req.body.draft_container.artwork_shipping.artwork_shipping_exceptions).length > 0) 
    {
        for (let i = 0; i < Object.keys(req.body.draft_container.artwork_shipping.artwork_shipping_exceptions).length; i++) 
        {
            if (req.body.draft_container.artwork_shipping.artwork_shipping_exceptions[Object.keys(req.body.draft_container.artwork_shipping.artwork_shipping_exceptions)[i]].payer !== "You") 
            {
                notNullableElements.push("artwork_shipping_exceptions." + Object.keys(req.body.draft_container.artwork_shipping.artwork_shipping_exceptions)[i] + ".currency");
                notNullableElements.push("artwork_shipping_exceptions." + Object.keys(req.body.draft_container.artwork_shipping.artwork_shipping_exceptions)[i] + ".price");
            }
        }
    }

    let response = missingFieldsResponse([notNullableElements], req.body.draft_container.artwork_shipping);

    console.log(response);

    if (response.error_data?.element?.startsWith("artwork_shipping_own")) 
    {
        response.error_data.element = "artwork_shipping_own";
    }

    if (response.error_data?.element?.startsWith("artwork_shipping_rest")) 
    {
        response.error_data.element = "artwork_shipping_rest";
    }

    let isException = response.error_data?.element?.startsWith("artwork_shipping_exceptions");
    if (response.error_data?.element?.includes(".currency")) 
    {
        response.error_data.element = response.error_data.element.replace("artwork_shipping_exceptions.", "");
        response.error_data.element = response.error_data.element.replace(".currency", "");
    }

    if (response.error_data?.element?.includes(".price")) 
    {
        response.error_data.element = response.error_data.element.replace("artwork_shipping_exceptions.", "");
        response.error_data.element = response.error_data.element.replace(".price", "");
    }

    if (isException) 
    {
        response.error_data.element = req.body.draft_container.artwork_shipping.artwork_shipping_exceptions[response.error_data.element].element;
    }

    if (Object.keys(response).length > 0) 
    {
        return res.status(400).json(response);
    }

    try 
    {
        await Draft.Validators.ShippingValidation(req.body.draft_container.artwork_shipping);
        req.body.draft_status = "pending";
    }
    catch (error) 
    {
        return ExceptionService.handle(error, res);
    }

    next();

}

module.exports = {
    checkRequiredKeys,
    aboutRequiredKeys,
    mediaRequiredKeys,
    shippingRequiredKeys,
};