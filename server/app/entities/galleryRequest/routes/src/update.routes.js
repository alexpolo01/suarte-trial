const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const GalleryRequest = ModelsService.Models.GalleryRequest;

        // Update galleryrequest
        app.put(
            "/galleryrequest/:galleryrequest_id/", 
            [
                deactivateRoute,
                tokenValid
            ], 
            GalleryRequest.Controller.updateGalleryRequest
        );
    }

};