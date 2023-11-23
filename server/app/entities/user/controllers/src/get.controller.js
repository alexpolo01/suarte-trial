const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
// const SearchService = require("@services/search.service");
const axios = require("axios");

/**
 * Get all users
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllUsers(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach((key) => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key];
            }
        });
        const response = await User.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map((user) => user.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get user by token
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getMe(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findById(req.token_decoded.uid);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.token_decoded.uid + " not found",
                error_data: {
                    req: req.body,
                },
            });
        }
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get user by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getUserById(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findById(req.params.user_id);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.user_id + " not found",
                error_data: {
                    req: req.body,
                },
            });
        }
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get user by username
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getUserByUsername(req, res) 
{
    const User = ModelsService.Models.User;
    const Product = ModelsService.Models.Product;
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const username = req.params.username;
        const user = await User.findOne({ user_username: username });
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException(
                {
                    error_type: "NOT_FOUND",
                    error_message: username + " not found",
                    error_data: {
                        req: req.body,
                    },
                },
                200
            );
        }
        let user_info = { ...user.toJSON() };
        if (req?.token_decoded?.uid) 
        {
            const Follow = User.Follow;
            user_info = {
                ...user_info,
                im_following: await Follow.isFollowing(req.token_decoded.uid, user._id),
                is_following_me: await Follow.isFollowing(
                    user._id,
                    req.token_decoded.uid
                ),
            };
        }
        // If user type is gallery, flag with number of drafts and artworks
        if (user.user_type === "gallery") 
        {
            const Draft = ModelsService.Models.Draft;
            const Post = ModelsService.Models.Post;
            const drafts = await Draft.subModel.countDocuments({
                gallery: user._id,
                draft_status: "incomplete",
            });
            const posts = await Post.subModel.countDocuments({
                gallery: user._id,
                post_status: "incomplete",
            });
            user_info = {
                ...user_info,
                draft_count: drafts,
                post_draft_count: posts,
            };
        }

        // If user type is collector, calculate number of artworks
        let countLikes = 0,
            countArtworks = 0,
            countFollows = 0;
        if (user.user_type === "collector") 
        {
            const products = await Product.findMany({
                product_owner: user._id,
            });

            countLikes = await Artwork.ArtworkLike.subModel.countDocuments({
                artwork: {
                    $in: products.map((product) => product.product_artwork),
                },
            });
            countArtworks = products.length;
        }
        else if (user.user_type === "artist") 
        {
            const artworks = await Artwork.findMany({
                "artwork_about.artwork_artist": user._id,
            });

            countLikes = await Artwork.ArtworkLike.subModel.countDocuments({
                artwork: {
                    $in: artworks.map((artwork) => artwork._id),
                },
            });

            countArtworks = artworks.length;
        }
        else if (user.user_type === "gallery") 
        {
            const artworks = await Artwork.findMany({
                "artwork_about.artwork_gallery": user._id,
                artwork_status: "available",
            });

            countLikes = await Artwork.ArtworkLike.subModel.countDocuments({
                artwork: {
                    $in: artworks.map((artwork) => artwork._id),
                },
            });

            countArtworks = artworks.length;
        }

        countFollows = await User.Follow.subModel.countDocuments({
            followee: user._id,
        });

        user_info = {
            ...user_info,
            user_profile_info: {
                ...user_info.user_profile_info,
                user_artworks: countArtworks,
                user_likes: countLikes,
                user_inspiring: countFollows,
            },
        };

        return res.status(200).json(user_info);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getFakeRankings(req, res) 
{
    const User = ModelsService.Models.User;
    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        sort: { createdAt: -1 },
        customLabels: {
            docs: "data",
        },
    };
    try 
    {
        const response = await User.subModel.paginate(
            {
                "user_flags.onboarding_completed": true,
            },
            options
        );
        return res.status(200).json(response);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getUserProfileDataById(req, res) 
{
    console.log(req.params.user_id);
    const Artlist = ModelsService.Models.Artlist;
    const Product = ModelsService.Models.Product;
    const Thought = ModelsService.Models.Thought;
    const Rating = ModelsService.Models.Rating;
    const Post = ModelsService.Models.Post;
    const User = ModelsService.Models.User;

    const returnValue = {};
    try 
    {
        const artlistFilterQuery = {
            artlist_creator: req.params.user_id,
        };

        const collectionFilterQuery = {
            product_owner: req.params.user_id,
        };

        const thoughtFilterQuery = {
            thought_creator: req.params.user_id,
            thought_parent: null,
        };

        const ratingFilterQuery = {
            rating_creator: req.params.user_id,
        };

        const postFilterQuery = {
            gallery: req.params.user_id,
            post_status: "published",
        };

        const artlistsCount = await Artlist.subModel.countDocuments(
            artlistFilterQuery
        );
        const collectionCount = await Product.subModel.countDocuments(
            collectionFilterQuery
        );
        console.log("collectionCount:", collectionCount);
        const thoughtCount = await Thought.subModel.countDocuments(
            thoughtFilterQuery
        );
        const ratingCount = await Rating.subModel.countDocuments(ratingFilterQuery);

        const postsCount = await Post.subModel.countDocuments(postFilterQuery);

        const query_user_type = req.query.user_type ?? "";
        const query_status = req.query.status ?? "available";
        let url =
      process.env.NODE_ENV === "production"
          ? `https://api.suarte.art/artworks/${req.params.user_id}?user_type=${query_user_type}&status=${query_status}`
          : `https://dev.suarte.art/artworks/${req.params.user_id}?user_type=${query_user_type}&status=${query_status}`;

        const artworksResponse = await axios.get(url);

        const artistsResponse = await User.Controller.getArtistsProfileByUserId(
            req,
            res
        );

        returnValue.artlists = artlistsCount;
        returnValue.collections = collectionCount;
        returnValue.thoughts = thoughtCount;
        returnValue.ratings = ratingCount;
        returnValue.artworks = artworksResponse.data.totalDocs;
        returnValue.posts = postsCount;
        returnValue.artists = artistsResponse.totalDocs;

        return res.status(200).json({ data: returnValue });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllUsers,
    getMe,
    getUserById,
    getUserByUsername,
    getFakeRankings,
    getUserProfileDataById,
};
