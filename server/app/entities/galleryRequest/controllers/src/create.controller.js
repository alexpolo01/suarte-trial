const { usernameExists, emailExists } = require("@services/userExists.service");
const { usernameValidation, passwordValidation } = require("@services/validation.service");
const ModelsService = require("@services/models.service");
const EmailService = require("@services/email.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new galleryrequest
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createGalleryRequest(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    let transaction = await GalleryRequest.transaction(DbService.get());
    try 
    {
        req.body.user_username = req.body.user_username.toLowerCase().trim();
        req.body.user_email = req.body.user_email.toLowerCase().trim();
        if ((await usernameExists(req.body.user_username)).exists) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestBadRequestException({
                error_type: "INVALID_USERNAME_ALREADY_IN_USE",
                error_message: "The username " + req.body.gallery_username + " already exists.",
                error_data: {
                    req: req.body,
                    element: "user_username"
                }
            }, 400);
        }
        else if (!req.body.user_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestBadRequestException({
                error_type: "INVALID_EMAIL",
                error_message: "The email " + req.body.user_email + " is invalid.",
                error_data: {
                    req: req.body,
                    element: "user_email"
                }
            }, 400);
        }
        else if ((await emailExists(req.body.user_email)).exists) 
        {
            throw new GalleryRequest.Exceptions.GalleryRequestBadRequestException({
                error_type: "EMAIL_IN_USE",
                error_message: "The email " + req.body.user_email + " already exists.",
                error_data: {
                    req: req.body,
                    element: "user_email"
                }
            }, 400);
        }
        usernameValidation(req.body.user_username);
        req.body.user_username = req.body.user_username.toLowerCase();
        passwordValidation(req.body.user_password);
        const galleryrequest = await GalleryRequest.createOne(req.body, { transaction });
        await transaction.commit();
        res.status(201).json(galleryrequest.toJSON());
        EmailService.send(EmailService.EmailTypes.GALLERY_REQUEST, {
            from: {
                name: "Suarte",
                address: "support@suarte.art"
            },
            to: galleryrequest.user_email,
        }, {
            gallery_name: galleryrequest.user_name ?? galleryrequest.user_username ?? "Gallery",
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

module.exports = {
    createGalleryRequest
};