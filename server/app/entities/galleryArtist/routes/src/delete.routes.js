const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Delete galleryartist by id
        app.delete(
            "/galleryartist/:galleryartist_id/", 
            [
                deactivateRoute,
                tokenValid,
                GalleryArtist.Middlewares.canDeleteResource,
            ], 
            GalleryArtist.Controller.deleteGalleryArtist
        );
    }

};