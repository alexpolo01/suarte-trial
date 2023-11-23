const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Like artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function likeArtlist(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        const like = await Artlist.ArtlistLike.like(req.params.artlist_id, req.token_decoded.uid);
        return res.status(200).json(like);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unlike artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unlikeArtlist(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        const unlike = await Artlist.ArtlistLike.unlike(req.params.artlist_id, req.token_decoded.uid);
        return res.status(200).json(unlike);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get liked artlists
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getLikedArtlists(req, res)
{
    const Artlist = ModelsService.Models.Artlist;
    try
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            }
        };
        const pipeline = Artlist.ArtlistLike.subModel.aggregate([
            {
                $match: { user: req.token_decoded.uid }
            },
            {
                $lookup: {
                    from: "artlists",
                    localField: "artlist",
                    foreignField: "_id",
                    as: "artlist"
                }
            },
            {
                $unwind: "$artlist"
            },
            {
                $lookup: {
                    from: "users", 
                    localField: "artlist.artlist_creator",
                    foreignField: "_id",
                    as: "artlist.artlist_creator"
                }
            },
            {
                $unwind: "$artlist.artlist_creator"
            },
            {
                $replaceRoot: { 
                    newRoot: "$artlist" 
                }
            }
        ], options);
        const artlists = await Artlist.ArtlistLike.subModel.aggregatePaginate(pipeline, options);
        return res.status(200).json(artlists);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    likeArtlist,
    unlikeArtlist,
    getLikedArtlists,
};