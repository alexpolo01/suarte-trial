const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Save artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function saveArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const save = await Artwork.ArtworkSave.save(req.params.artwork_id, req.token_decoded.uid);
        return res.status(200).json(save);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unsave artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unsaveArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const unsave = await Artwork.ArtworkSave.unsave(req.params.artwork_id, req.token_decoded.uid);
        return res.status(200).json({ unsave });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get saved artworks
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getSavedArtworks(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            }
        };

        const query = {
            user: req.token_decoded.uid
        };

        const artworks = await Artwork.ArtworkSave.subModel.paginate(query, options);
        artworks.data = artworks.data.map(artwork => artwork.artwork);
        return res.status(200).json(artworks);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    saveArtwork,
    unsaveArtwork,
    getSavedArtworks,
};