const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    accept : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;
        // Confirm galleryaccessrequest
        app.post(
            "/request/access/gallery/accept/:request_id",
            [
                tokenValid,
            ],
            GalleryRequest.Controller.acceptGalleryRequest
        );
    },
};