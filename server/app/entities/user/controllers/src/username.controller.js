const { usernameExists } = require("@services/userExists.service");
const { usernameValidation, passwordValidation } = require("@services/validation.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Check if username is valid and available
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function checkUsername(req, res) 
{
    try 
    {
        if (!req.body.username) 
        {
            return res.status(400).json({
                error_type: "EMPTY_FIELD",
                error_message: "Username is required"
            });
        }
        usernameValidation(req.body.username);
        passwordValidation(req.body.password);
        const username = await usernameExists(req.body.username);
        if (!username.exists) 
        {
            return res.status(200).json({ username: username, status: "AVAILABLE" });
        }
        else 
        {
            return res.status(409).json({ status: "UNAVAILABLE" });
        }
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    checkUsername
};