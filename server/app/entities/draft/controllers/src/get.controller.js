const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all drafts
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllDrafts(req, res) 
{
    const Draft = ModelsService.Models.Draft;
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
        const response = await Draft.findPaginated(filterQuery, req.query);
        let data = response.data.map(draft => draft.toJSON());
        return res.status(200).json({
            ...response,
            data
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get draft by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getDraftById(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    try 
    {
        const draft = await Draft.findById(req.params.draft_id);
        if (!draft) 
        {
            throw new Draft.Exceptions.DraftNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.draft_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(draft.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getPendingDrafts(req, res) 
{
    const Draft = ModelsService.Models.Draft;
    try 
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit : req.query.limit ?? 10,
            customLabels : {
                docs : "data"
            },
            populate : {
                path : "gallery"
            }
        };

        const response = await Draft.subModel.paginate({ draft_status: req.params.status }, options);
        return res.status(200).json(response);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllDrafts,
    getDraftById,
    getPendingDrafts
};