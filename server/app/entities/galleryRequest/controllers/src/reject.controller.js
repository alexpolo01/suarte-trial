const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

async function rejectGalleryRequest(req, res) 
{
    const GalleryRequest = ModelsService.Models.GalleryRequest;
    let transaction = await GalleryRequest.transaction(DbService.get());
    try 
    {
        const galleryrequest = await GalleryRequest.findById(req.params.request_id, {transaction, castId: true});
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
            });
        }
        galleryrequest.status = "rejected";
        galleryrequest.reason = req.body.reason;
        await galleryrequest.save({ session: transaction.transaction });
        await transaction.commit();
        // try {
        //     // TODO: Send email to user
        //     const email_response = await sendEmail({
        //         type: "GALLERY_REJECTED",
        //         from: "contact@suarte.art",
        //         to: galleryrequest.user_email,
        //         subject: "Gallery access request rejected",
        //     }, {
        //         reason: req.body.reason,
        //     });
        //     console.log(email_response);
        // } catch (error) {
        //     console.log(error);
        // }
        return res.status(200).json(galleryrequest.toJSON());
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
    rejectGalleryRequest
};