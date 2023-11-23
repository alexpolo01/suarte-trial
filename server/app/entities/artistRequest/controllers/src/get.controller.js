const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all artistrequests
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllArtistRequests(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
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
        const response = await ArtistRequest.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(artistrequest => artistrequest.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get artistrequest by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getArtistRequestById(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    try 
    {
        const artistrequest = await ArtistRequest.findById(req.params.artistrequest_id);
        if (!artistrequest) 
        {
            throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artistrequest_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(artistrequest.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllArtistRequests,
    getArtistRequestById
};