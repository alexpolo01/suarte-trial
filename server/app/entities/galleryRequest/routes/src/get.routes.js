const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");

module.exports = {
    
    getAll : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;

        // Get all galleryrequests.
        app.get(
            "/request/access/gallery",
            [
                tokenValid,
                isAdmin
            ],
            GalleryRequest.Controller.getAllGalleryRequests
        );
    },

    get : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;

        // Get galleryrequest by id
        app.get(
            "/request/access/gallery/:galleryrequest_id/",
            [
                tokenValid,
                isAdmin,
                GalleryRequest.Middlewares.canReadResource,
            ],
            GalleryRequest.Controller.getGalleryRequestById
        );
    }

};