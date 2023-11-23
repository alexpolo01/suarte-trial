const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");

/**
 * Get all artworks sold
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getSoldArtworks(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data"
            },
            sort : {
                createdAt: -1
            }
        };

        const result = await Artwork.subModel.paginate({
            artwork_status: {
                $in: ["sold", "original_sold"]
            },
            "artwork_about.artwork_gallery": req.token_decoded.uid
        }, options);

        return res.status(200).json(result);

    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get all artworks available
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAvailableArtworks(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {

        const result = await SearchService.searchArtworks(
            req,
            Artwork,
            {
                artwork_status: {
                    $in: ["available"]
                },
                "artwork_about.artwork_gallery": req.token_decoded.uid
            }, 
        );

        return res.status(200).json(result);

    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get pending artworks/drafts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getPendingArtworks(req, res)
{
    const Draft = ModelsService.Models.Draft;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data"
            },
        };

        const result = await Draft.subModel.paginate({
            draft_status: {
                $in: ["pending", "changes_required"]
            },
            gallery: req.token_decoded.uid
        }, options);

        return res.status(200).json(result);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    getSoldArtworks,
    getAvailableArtworks,
    getPendingArtworks,
};