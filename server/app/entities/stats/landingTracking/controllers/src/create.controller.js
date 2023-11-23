const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const UserAgentParser = require("ua-parser-js");
const ExceptionService = require("@services/exception.service");

/**
 * Create new landingtracking
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createLandingTracking(req, res) 
{
    const LandingTracking = ModelsService.Models.LandingTracking;
    try 
    {
        const full_url = new URL(req.body.full_url);
        const search_params = Object.fromEntries(full_url.searchParams.entries());
        const data = {
            full_url: req.body.full_url,
            base_url: full_url.origin + full_url.pathname,
            search_params: search_params,
            ip_address: req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            location: {
                continent : req.headers["cf-ipcontinent"],
                country: req.headers["cf-ipcountry"],
                metro : req.headers["cf-metrocode"],
                region : req.headers["cf-regioncode"],
                city: req.headers["cf-ipcity"],
                zip : req.headers["cf-postalcode"],
                timezone : req.headers["cf-timezone"],
            },
            user_agent: UserAgentParser(req.headers["user-agent"]),
            user_email: search_params?.ref ? Buffer.from(search_params?.ref, "base64").toString("utf-8") : null
        };
        if(req.headers["cf-longitude"] && req.headers["cf-latitude"]) 
        {
            data.location.location = {
                type: "Point",
                coordinates: [req.headers["cf-longitude"], req.headers["cf-latitude"]]
            };
        }
        const landingtracking = await LandingTracking.createOne(data);
        return res.status(201).json(landingtracking.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createLandingTracking
};