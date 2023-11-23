const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const { usernameExists, emailExists } = require("@services/userExists.service");
const EmailService = require("@services/email.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

async function acceptGalleryRequest(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    const User = ModelsService.Models.User;
    const Gallery = ModelsService.Models.User.Gallery;
    let transaction = await GalleryRequest.transaction(DbService.get());
    let firebase_user_created = false;
    try 
    {
        const galleryrequest = await GalleryRequest.findById(req.params.request_id, { transaction, castId: true });
        if (galleryrequest.status !== "new") 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestAlreadyExistsException({
                error_type: "GALLERY_ACCESS_REQUEST_ALREADY_CONFIRMED",
                error_message: "The gallery access request " + req.params.request_id + " has already been confirmed.",
                error_data: {
                    req: req.body,
                    request: galleryrequest,
                    element: "request_id"
                }
            }, 400);
        }
        if ((await usernameExists(galleryrequest.user_username, [User])).exists) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestAlreadyExistsException({
                error_type: "INVALID_USERNAME_ALREADY_IN_USE",
                error_message: "The username " + galleryrequest.user_username + " already exists.",
                error_data: {
                    req: req.body,
                    element: "user_username"
                }
            }, 400);
        }
        if ((await emailExists(galleryrequest.user_email, [User])).exists) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestAlreadyExistsException({
                error_type: "INVALID_EMAIL_ALREADY_IN_USE",
                error_message: "The email " + galleryrequest.user_email + " already exists.",
                error_data: {
                    req: req.body,
                    element: "user_email"
                }
            }, 400);
        }
        const gallery_info = {
            user_email: galleryrequest.user_email,
            user_password: galleryrequest.user_password,
            user_username: galleryrequest.user_username,
            user_name: galleryrequest.user_name,
            user_gender: galleryrequest.user_gender,
            user_birth: galleryrequest.user_birth,
            gallery_business_id: galleryrequest.gallery_business_id,
            gallery_address: galleryrequest.gallery_address,
            gallery_agent: galleryrequest.gallery_agent,
        };
        const firebase_user = await AuthService.createUserInFirebase(gallery_info);
        firebase_user_created = firebase_user;
        gallery_info._id = firebase_user.uid;
        const gallery = await Gallery.createOne(gallery_info, { transaction });
        // Close gallery request
        galleryrequest.status = "confirmed";
        galleryrequest.gallery = gallery._id;
        await galleryrequest.save({ session: transaction.transaction });
        await transaction.commit();
        EmailService.send(EmailService.EmailTypes.GALLERY_APPROVED, {
            to: galleryrequest.user_email,
            from : {
                name: "Suarte",
                address : "no-reply@suarte.art"
            }
        }, {
            gallery_name: galleryrequest.user_name ?? galleryrequest.user_username ?? "Gallery"
        });
        return res.status(200).json(galleryrequest.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        try 
        {
            if (firebase_user_created?.uid) 
            { 
                await AuthService.deleteUserInFirebase(firebase_user_created.uid);
            }
        }
        catch (firebase_error) 
        {
            LogService.ErrorLogger.error(firebase_error);
            error.error_data.firebase_error = firebase_error;
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    acceptGalleryRequest
};
