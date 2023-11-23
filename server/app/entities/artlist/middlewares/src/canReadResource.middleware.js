
/**
 * Check if the user that makes the request can read the resource specified in the request.
 * Every user can read an Artlist.
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canReadResource(req, res, next) 
{

    // Initially, every user can read an Artlist
    // console.warn("canReadResource middleware is not implemented yet");
    next();
}

module.exports = canReadResource;

