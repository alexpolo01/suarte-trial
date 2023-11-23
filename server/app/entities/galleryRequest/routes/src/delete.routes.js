const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;

        // Delete galleryrequest by id
        app.delete(
            "/request/access/gallery/:galleryrequest_id/", 
            [
                deactivateRoute,
                tokenValid,
                GalleryRequest.Middlewares.canDeleteResource,
            ], 
            GalleryRequest.Controller.deleteGalleryRequest
        );
    }

};