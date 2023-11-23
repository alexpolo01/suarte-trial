const { usernameExists } = require("@services/userExists.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

async function completeOnboardingCollector(req, res) 
{
    const User = ModelsService.Models.User;
    const Collector = ModelsService.Models.User.Collector;
    try 
    {
        const username = req.body.user_username.toLowerCase().trim();
        const response = await usernameExists(username);
        if (response.exists) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_type: "INVALID_USERNAME_ALREADY_IN_USE",
                error_message: "The username " + req.body.user_username + " already exists.",
                error_data: { req: req.body, element: "user_username" }
            });
        }
        let user = await Collector.findById(req.token_decoded.uid);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        user.user_flags.onboarding_completed = true;
        user.user_username = username;
        user.user_birth = req.body.user_birth;
        await user.save();
        return res.status(200).json({
            ...user.toJSON(),
            user_flags: {
                ...user.user_flags,
                onboarding_completed: false
            }
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function completeOnboardingArtist(req, res) 
{
    const Artist = ModelsService.Models.User.Artist;
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        let user = await Artist.findById(req.token_decoded.uid);
        const username = req.body.user_username.toLowerCase().trim();
        const response = await usernameExists(username);
        if (response.exists && response.user._id !== user._id) 
        {
            throw new ModelsService.Models.User.Exceptions.UserBadRequestException({
                error_type: "INVALID_USERNAME_ALREADY_IN_USE",
                error_message: "The username " + req.body.user_username + " already exists.",
                error_data: {
                    req: req.body,
                    element: "user_username"
                }
            });
        }
        let user_name = req.body.user_name;
        user.user_name = user_name;
        user.user_flags.onboarding_completed = true;
        user.user_username = username;
        user.user_birth = req.body.user_birth;
        user.user_gender = req.body.user_gender;
        await Artwork.subModel.updateMany({
            "artwork_about.artwork_gallery_artist": user.gallery_artist?._id,
            "artwork_about.artwork_artist": null,
        }, {
            "artwork_about.artwork_artist": user._id,
        }, { });
        await user.save();
        return res.status(200).json({
            ...user.toJSON(),
            user_flags: {
                ...user.user_flags,
                onboarding_completed: false
            }
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function completeOnboardingGallery(req, res) 
{
    const Gallery = ModelsService.Models.User.Gallery;
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const gallery = await Gallery.findById(req.token_decoded.uid);
        gallery.user_flags.onboarding_completed = true;
        const res = await Artwork.updateMany({
            artwork_status: "available",
        }, {
            where : {
                "artwork_about.artwork_gallery": gallery._id,
                artwork_status: "unavailable"
            }
        });
        await gallery.save();
        return res.status(200).json(gallery.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    completeOnboardingCollector,
    completeOnboardingArtist,
    completeOnboardingGallery
};