const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all artlists
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllArtlists(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    try 
    {
        const filterableKeys = ["artlist_creator"];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key]; 
            } 
        });
        const response = await Artlist.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(artlist => artlist.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getArtlistsByUserId(req, res) 
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
        const filterQuery = {
            artlist_creator: req.params.user_id,
        };
        const artlists = await Artlist.subModel.paginate(filterQuery, options);
        return res.status(200).json(artlists);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get artlist by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getArtlistById(req, res) 
{
    const Artlist = ModelsService.Models.Artlist;
    const mongoose = DbService.get();
    try 
    {
        // Convert the id to a mongoose ObjectId
        try 
        {
            req.params.artlist_id = new mongoose.Types.ObjectId(req.params.artlist_id);
        }
        catch (error) 
        {
            throw new Artlist.Exceptions.ArtlistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artlist_id + " not found",
                error_data: {
                    artlist_id: req.params.artlist_id
                }
            }, 200); // 200 because frontend issues
        }
        const artlist = await Artlist.findById(req.params.artlist_id);
        if (!artlist) 
        {
            throw new Artlist.Exceptions.ArtlistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artlist_id + " not found",
                error_data: {
                    req: req.body
                }
            }, 200); // 200 because frontend issues
        }

        const artlistLikes = await Artlist.ArtlistLike.subModel.countDocuments({
            artlist: artlist._id
        });

        let isLiked = false;
        if(req.token_decoded) 
        {
            isLiked = await Artlist.ArtlistLike.subModel.countDocuments({
                artlist: artlist._id,
                user: req.token_decoded.uid
            }) > 0;
        }

        return res.status(200).json({
            ...artlist.toJSON(),
            artlist_likes: artlistLikes,
            is_liked: isLiked,
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllArtlists,
    getArtlistById,
    getArtlistsByUserId
};