const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Check suarteroad info
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function getSuarteRoadStep(req) {
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findById(req);
        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
                error_data: {
                    req: req,
                    element: "user_id",
                    error_code: "NOT_FOUND"
                }
            });
        }
        // Pre-step: If user already has suarteroad, return
        if (user.user_flags.suarteroad_completed)
        {
            return {
                success: true,
                result: 9,
            }
        }
        // Step 1: Check if user has image
        if (!user.user_image)
        {
            return {
                success: true,
                result: 1,
            }
        }
        // Step 2: User has liked 10 or more artworks
        const likes = await ModelsService.Models.Artwork.ArtworkLike.subModel.countDocuments({ user: user._id });
        if (likes < 10)
        {
            return {
                success: true,
                result: 2,
            }
        }
        // Step 3: User has followed 5 or more users
        const follows = await ModelsService.Models.User.Follow.subModel.countDocuments({ follower: user._id });
        if (follows < 5)
        {
            return {
                success: true,
                result: 3,
            }
        }
        // Step 4: User has written 3 or more thoughts
        const thoughts = await ModelsService.Models.Thought.subModel.countDocuments({ thought_creator: user._id });
        if (thoughts < 3)
        {
            return {
                success: true,
                result: 4,
            }
        }
        // Step 5: User has created an artlist
        const artlists = await ModelsService.Models.Artlist.subModel.countDocuments({ artlist_creator: user._id });
        if (artlists < 1)
        {
            return {
                success: true,
                result: 5,
            }
        }
        // Step 6: User has rated 5 or more artworks
        const ratings = await ModelsService.Models.Rating.subModel.countDocuments({ rating_creator: user._id });
        if (ratings < 5)
        {
            return {
                success: true,
                result: 6,
            }
        }
        // Step 7: User has played an audio (not sure if this is possible)
        // TODO: Implement this
        // IF USER IS COLLECTOR 
        if (user.user_type === "collector")
        {
            // Step 8: User has bought 1 product
            const products = await ModelsService.Models.Product.subModel.countDocuments({ product_owner: user._id });
            if (products < 1)
            {
                return {
                    success: true,
                    result: 8,
                }
            }
        }
        else if (user.user_type === "artist")
        {
            // Step 8: User has 3 artworks represented
            const artworks = await ModelsService.Models.Artwork.subModel.countDocuments({ "artwork_about.artwork_artist" : user._id });
            if (artworks < 3)
            {
                return {
                    success: true,
                    result: 8,
                }
            }
        }

        user.user_flags.suarteroad_completed = true;
        await user.save();

        return {
            success: true,
            result: 9,
        }

    }
    catch (error) 
    {
        return {
            success: false,
            result: error
        };
    }
}

async function suarteRoad(req, res) 
{
    const result = await getSuarteRoadStep(req.token_decoded.uid);
    if(result.success) {
        res.status(200).json({
            completed: (result.result > 8),
            step: result.result,
        })
    }
    else {
        LogService.ErrorLogger.error(result.result);
        ExceptionService.handle(result.result, res);
    }
}

module.exports = {
    suarteRoad,
    getSuarteRoadStep
};