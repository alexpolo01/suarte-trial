const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get onboarding info, all drafts and artworks associated with the user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOnboardingInfo(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    try 
    {
        const drafts = await Draft.findMany({ 
            gallery: req.token_decoded.uid,
            draft_status: {
                $ne: "approved"
            }
        });
        const artworks = await Draft.findMany({ 
            gallery: req.token_decoded.uid,
            draft_status: "approved"
        });
        return res.status(200).json({
            drafts_count: drafts.length,
            artworks_count: artworks.length,
            drafts: drafts.map((draft) => draft.toJSON()),
            artworks: artworks.map((artwork) => artwork.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getOnboardingInfo
};