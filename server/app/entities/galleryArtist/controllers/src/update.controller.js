const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const { emailExists } = require("@services/userExists.service");

/**
 * Update galleryartist
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateGalleryArtist(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        let galleryartist = req.galleryartist ?? await GalleryArtist.findOne({ [GalleryArtist.modelId]: req.params.galleryartist_id });
        if (!galleryartist) 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "GalleryArtist not found",
                error_data: {
                    galleryartist_id: req.params.galleryartist_id
                }
            });
        }
        if (req.body.artist_email && req.body.artist_email !== galleryartist.artist_email) 
        {
            const exists = await emailExists(req.body.artist_email, [ModelsService.Models.User, GalleryArtist], ["artist_email", "user_email"]);
            if (exists.exists)
            {
                throw new GalleryArtist.Exceptions.GalleryArtistBadRequestException({
                    error_message: "Email already exists",
                    error_type: "EMAIL_IN_USE",
                    error_data: {
                        element: "artist_email",
                    }
                });
            }
        }
        galleryartist = await GalleryArtist.subModel.findOneAndUpdate({ _id: galleryartist._id }, req.body, { new: true });
        return res.status(200).json(galleryartist);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function completeProfile(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        let galleryartist = req.galleryartist ?? await GalleryArtist.findOne({ [GalleryArtist.modelId]: req.params.galleryartist_id });
        if (!galleryartist) 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "GalleryArtist not found",
                error_data: {
                    galleryartist_id: req.params.galleryartist_id
                }
            });
        }
        if(!galleryartist.artist_should_request_email) 
        {
            throw new GalleryArtist.Exceptions.GalleryArtistConflictException({
                error_message: "Artist should request email",
                error_type: "CONFLICT",
                error_data: {
                    element: "artist_email",
                }
            });
        }
        if(!(await emailExists(req.body.artist_email, [
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
        galleryartist = await GalleryArtist.subModel.findOneAndUpdate({ _id: galleryartist._id }, {
            artist_should_request_email: false,
            artist_email: req.body.artist_email,
            gallery: req.token_decoded.uid
        }, { new: true });
        return res.status(200).json(galleryartist);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateGalleryArtist,
    completeProfile
};