const ModelsService = require("@services/models.service");
const { passwordValidation } = require("@services/validation.service");
const { usernameExists } = require("@services/userExists.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Resend code
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function resendCode(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    let transaction = await ArtistRequest.transaction(DbService.get());
    // TODO: Add timeout to prevent spam
    try 
    {
        const artistrequest = await ArtistRequest.findById(req.body.oobCode, transaction);
        if (!artistrequest || artistrequest.status !== "pending") 
        {
            throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Code not found",
                error_data: {
                    req: req.body,
                    element: "oobCode",
                    error_code: "NOT_FOUND"
                }
            });
        }
        // TODO: Send email
        console.log("TODO: Send email. Request: ", artistrequest.toJSON());
        await transaction.commit();
        return res.status(201).json({
            ...artistrequest.toJSON(),
            oobCode: artistrequest._id
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

async function verifyCode(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    let transaction = await ArtistRequest.transaction(DbService.get());
    try 
    {
        const artistrequest = await ArtistRequest.findById(req.body.oobCode, { transaction, castId: true });
        if (!artistrequest || artistrequest.status === "completed" || artistrequest.status === "verified") 
        {
            throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Code not found",
                error_data: {
                    req: req.body,
                    element: "oobCode",
                    error_code: "NOT_FOUND"
                }
            });
        }
        if (artistrequest.user_code != req.body.code) 
        {
            throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
                error_type: "INVALID_CODE",
                error_message: "Invalid code",
                error_data: {
                    req: req.body,
                    element: "code",
                    error_code: "INVALID_CODE"
                }
            }, 400);
        }
        artistrequest.status = "verified";
        await artistrequest.save({ session: transaction.transaction });
        await transaction.commit();
        return res.status(201).json({
            ...artistrequest.toJSON(),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

async function createArtistProfile(req, res) 
{
    const ArtistRequest = ModelsService.Models.ArtistRequest;
    const Artist = ModelsService.Models.User.Artist;
    const Artwork = ModelsService.Models.Artwork;
    let transaction = await ArtistRequest.transaction(DbService.get());
    let user_id = null;
    try 
    {
        const artistrequest = await ArtistRequest.findById(req.body.oobCode, { transaction });
        if (!artistrequest || artistrequest.status !== "verified") 
        {
            throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Code not found",
                error_data: {
                    req: req.body,
                    element: "oobCode",
                    error_code: "NOT_FOUND"
                }
            });
        }
        passwordValidation(req.body.user_password);
        // Populate
        await artistrequest.populate("gallery_artist");
        let username = artistrequest.gallery_artist?.artist_email.split("@")[0].toLowerCase().trim();
        while((await usernameExists(username)).exists) 
        {
            username = username + Math.floor(Math.random() * 9);
        }
        const artworksCount = await Artwork.subModel.countDocuments({ "artwork_about.artowrk_gallery_artist" : artistrequest.gallery_artist?._id });
        const likes = 0; // TODO: Get likes
        let user_info = {
            user_email: artistrequest.artist_email ?? artistrequest.user_email,
            user_password: req.body.user_password,
            user_name: artistrequest.gallery_artist?.artist_name,
            user_username: username.toLowerCase().trim(),
            gallery_artist: artistrequest.gallery_artist?._id,
            user_profile_info: {
                user_artworks: artworksCount,
                user_likes: likes,
                user_followers: 0,
            }
        };
        if(req.body.invite)
        {
            user_info.user_referral = req.body.invite;
        }
        const firebase_user = await AuthService.createUserInFirebase(user_info);
        // Create user in database
        user_id = firebase_user.uid;
        user_info._id = firebase_user.uid;
        const user = await Artist.createOne(user_info, { transaction });
        // Update artist request
        artistrequest.status = "completed";
        // Update all artworks with the new artist id
        await Artwork.subModel.updateMany({
            "artwork_about.artwork_gallery_artist": artistrequest.gallery_artist?._id,
            "artwork_about.artwork_artist": null
        }, {
            "artwork_about.artwork_artist": user._id,
        }, { session: transaction.transaction });
        await artistrequest.save({ session: transaction.transaction });
        await transaction.commit();
        const token = await AuthService.createCustomToken(firebase_user.uid, user.toJSON());
        return res.status(201).json({
            auth: true,
            user_session: user.toJSON(),
            custom_token: token
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        if (user_id) 
        {
            try 
            {
                await AuthService.deleteUserInFirebase(user_id);
            }
            catch (error) 
            {
                LogService.ErrorLogger.error(error);
            }
        }
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    resendCode,
    verifyCode,
    createArtistProfile
};