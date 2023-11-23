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
async function postRequiredKeys(req, res, next) 
{
    if (req.body.validation !== true) 
    {
        return next();
    }

    let notNullableElements = [
        "post_cover",
        "post_title",
        "post_main_text",
    ];

    let response = missingFieldsResponse([notNullableElements], req.body.post_container);

    if (Object.keys(response).length > 0) 
    {
        return res.status(400).json(response);
    }

    next();
}

module.exports = postRequiredKeys;