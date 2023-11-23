const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all galleryrequests
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllGalleryRequests(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    try 
    {
        const filterableKeys = ["status"];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key].replace(/\?/g, "");
            }
        });
        req.query.limit = req.query.limit || 10000;
        const response = await GalleryRequest.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(galleryrequest => galleryrequest.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get galleryrequest by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getGalleryRequestById(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    try 
    {
        const galleryrequest = await GalleryRequest.findById(req.params.galleryrequest_id);
        if (!galleryrequest) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.galleryrequest_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(galleryrequest.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllGalleryRequests,
    getGalleryRequestById
};