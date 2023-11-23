const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all landingtrackings
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllLandingTrackings(req, res) 
{
    const LandingTracking = ModelsService.Models.LandingTracking;
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
        const response = await LandingTracking.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(landingtracking => landingtracking.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get landingtracking by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getLandingTrackingById(req, res) 
{
    const LandingTracking = ModelsService.Models.LandingTracking;
    try 
    {
        const landingtracking = await LandingTracking.findById(req.params.landingtracking_id);
        if (!landingtracking) 
        {
            throw new LandingTracking.Exceptions.LandingTrackingNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.landingtracking_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(landingtracking.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllLandingTrackings,
    getLandingTrackingById
};