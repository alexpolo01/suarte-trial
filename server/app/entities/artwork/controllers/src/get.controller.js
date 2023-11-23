const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Get all artworks
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllArtworks(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
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
        const response = await Artwork.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(artwork => artwork.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get artwork by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getArtworkById(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const artwork = await Artwork.findOne({ _id: req.params.artwork_id });
        if (!artwork) 
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        return res.status(200).json(artwork.toJSON());
    }
    catch (error) 
    {
        let customError = error;
        if(!(error instanceof Artwork.Exceptions.ArtworkNotFoundException))
        {
            customError = new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body,
                    error: error
                }
            });
        }
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(customError, res);
    }
}

async function getArtworkSocial(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    const ArtworkLike = Artwork.ArtworkLike;
    const ArtworkSave = Artwork.ArtworkSave;
    const Thought = ModelsService.Models.Thought;
    const Rating = ModelsService.Models.Rating;
    try 
    {
        const artwork = await Artwork.findById(req.params.artwork_id);
        if (!artwork) 
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        const promises = [];

        promises.push(ArtworkLike.subModel.countDocuments({ artwork: artwork._id }));
        promises.push(Thought.subModel.countDocuments({ thought_artwork: artwork._id }));
        promises.push(Rating.subModel.countDocuments({ rating_artwork: artwork._id }));

        if (req.token_decoded) 
        {
            promises.push(ArtworkLike.subModel.exists({ artwork: artwork._id, user: req.token_decoded.uid }));
            promises.push(ArtworkSave.subModel.exists({ artwork: artwork._id, user: req.token_decoded.uid }));
            promises.push(Thought.subModel.exists({ thought_artwork: artwork._id, thought_creator: req.token_decoded.uid }));
            promises.push(Rating.subModel.exists({ rating_artwork: artwork._id, rating_creator: req.token_decoded.uid }));
        }

        const [
            likes_count,
            thoughts_count,
            ratings_count,
            is_liked,
            save_artwork,
            written_thought,
            published_rating,
        ] = await Promise.all(promises);

        return res.status(200).json({
            likes_count,
            thoughts_count,
            ratings_count,
            is_liked: !!is_liked,
            save_artwork: !!save_artwork,
            written_thought: !!written_thought,
            published_rating: !!published_rating,
        });
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllArtworks,
    getArtworkById,
    getArtworkSocial
};