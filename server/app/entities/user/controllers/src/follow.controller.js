const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");
const SocketService = require("@services/socket.service");
const SuarteRoad = require("@entities/user/controllers/src/suarteroad.controller");

/**
 * Follow a user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function followUser(req, res) 
{
    const User = ModelsService.Models.User;
    const Follow = ModelsService.Models.User.Follow;
    try 
    {
        const prevStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        let followerId = req.token_decoded.uid;
        let followeeId = req.body.followee_id;
        if (followerId === followeeId) 
        {
            throw new User.Exceptions.UserAlreadyExistsException({
                error_type: "CONFLICT",
                error_message: "You can't follow yourself",
                error_data: {
                    follower_id: followerId,
                    followee_id: followeeId,
                },
            });
        }
        const follower = await User.findById(followerId);
        const followee = await User.findById(followeeId);
        if (!followee) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: followee + " not found",
                error_data: {
                    followee_id: followee,
                },
            });
        }
        await Follow.follow(followerId, followee);
        SocketService.sendMessage(followee.user_email, {
            type: false,
            status: 7,
            subject: follower.user_username,
            object: "",
            sbj_image: follower.user_image.image_url + "/w=47",
        })
        const nextStat = await SuarteRoad.getSuarteRoadStep(req.token_decoded.uid);
        if (prevStat.success && nextStat.success) {
            if (prevStat.result != nextStat.result) {
                SocketService.suarteRoadStepChanged(req.token_decoded.uid, prevStat.result);
            }
        }
        return res.status(200).json({ follower: follower, followee: followee });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Unfollow a user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function unfollowUser(req, res) 
{
    const User = ModelsService.Models.User;
    const Follow = ModelsService.Models.User.Follow;
    try 
    {
        const follower = req.token_decoded.uid;
        const followee_id = req.body.followee_id;
        const followee = await User.findById(followee_id);
        if (!followee) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: followee_id + " not found",
                error_data: {
                    followee_id: followee_id,
                },
            });
        }
        await Follow.unfollow(follower, followee);
        return res.status(200).json({ follower: follower, followee: followee });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get followers
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getFollowers(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const users = await SearchService.searchInspiring(req, User.Follow);
        return res.status(200).json(users);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get following by me
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getFollowing(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const users = await SearchService.searchFollowing(req, User.Follow);
        return res.status(200).json(users);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
};
