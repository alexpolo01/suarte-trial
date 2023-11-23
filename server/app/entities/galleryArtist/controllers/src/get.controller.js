const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all galleryartists
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllGalleryArtists(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key]; 
            } 
        });
        const response = await GalleryArtist.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(galleryartist => galleryartist.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get galleryartist by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getGalleryArtistById(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        const galleryartist = await GalleryArtist.findById(req.params.galleryartist_id);
        if (!galleryartist) 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.galleryartist_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(galleryartist.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllGalleryArtists,
    getGalleryArtistById
};