const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;

        // Create new galleryrequest
        app.post(
            "/request/access/gallery/",
            [
                GalleryRequest.Middlewares.canCreateResource,
                GalleryRequest.Middlewares.checkRequiredKeys
            ],
            GalleryRequest.Controller.createGalleryRequest
        );
    }

};