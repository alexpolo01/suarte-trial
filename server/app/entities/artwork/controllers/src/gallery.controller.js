const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");

/**
 * Get artworks from gallery by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function getArtworks(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        let query = {};
        if (req.query.user_type === "artist") 
        {
            query = {
                "artwork_about.artwork_artist": req.params.gallery_id,
            };
        }
        else 
        {
            query = {
                "artwork_about.artwork_gallery": req.params.gallery_id,
                artwork_status: req.query.status ?? "available",
            };
        }

        let artworks = await SearchService.searchArtworks(req, Artwork, query);
        return res.status(200).json(artworks);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get artworks from gallery by user_id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function getArtworksByUserId(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        let query = {};
        if (req.query.user_type === "artist") 
        {
            query = {
                "artwork_about.artwork_artist": req.params.user_id,
            };
        }
        else 
        {
            query = {
                "artwork_about.artwork_gallery": req.params.user_id,
                artwork_status: req.query.status ?? "available",
            };
        }

        console.log("query:", query);
        let artworks = await SearchService.searchArtworks(req, Artwork, query);
        return res.status(200).json(artworks);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getDrafts(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    try 
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 20,
            customLabels: {
                docs: "data",
            },
        };
        const artworks = await Draft.subModel.paginate(
            {
                gallery: req.token_decoded.uid,
                draft_status: "incomplete",
            },
            options
        );
        return res.status(200).json(artworks);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getArtworks,
    getDrafts,
    getArtworksByUserId,
};
