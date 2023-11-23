const ModelsService = require("@services/models.service");
const { emailExists } = require("@services/userExists.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new galleryartist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createGalleryArtist(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    const mongoose = DbService.get();
    let transaction = await GalleryArtist.transaction(mongoose);
    try 
    {
        if(req.body.type === "Gallery owned") 
        {
            req.body.artist_should_request_email = true;
        }
        if(!req.body.artist_email && req.body.type !== "Gallery owned") 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistBadRequestException({
                error_message: "Artist email is required",
                error_type: "EMPTY_FIELD",
                error_data: {
                    element: "artist_email",
                }
            });
        }
        if(!req.body.artist_email && req.body.type === "Gallery owned") 
        {
            let email = req.body.artist_name.toLowerCase().trim();
            // Change spaces to dashes
            email = email.replace(/\s/g, "-");
            email = email.replace(/[^a-zA-Z0-9-]/g, "");
            // Generate random number between 0 and 1000
            email += "-";
            email += Math.floor(Math.random() * 1000);
            email += "@artist.suarte.art";
            req.body.artist_email = email;
        }
        req.body.artist_email = req.body.artist_email.toLowerCase().trim();
        if((await emailExists(req.body.artist_email, [
            ModelsService.Models.User,
            GalleryArtist
        ], ["artist_email", "user_email"])).exists) 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistBadRequestException({
                error_message: "Email already exists",
                error_type: "EMAIL_IN_USE",
                error_data: {
                    element: "artist_email",
                }
            });
        }
        req.body.gallery = req.token_decoded.uid;
        const galleryartist = await GalleryArtist.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(galleryartist.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if(transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createGalleryArtist
};