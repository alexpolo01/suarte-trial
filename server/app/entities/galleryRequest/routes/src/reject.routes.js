const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    reject : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;
        
        // Reject galleryaccessrequest
        app.post(
            "/request/access/gallery/reject/:request_id",
            [
                tokenValid,
            ],
            GalleryRequest.Controller.rejectGalleryRequest
        );
    }
};