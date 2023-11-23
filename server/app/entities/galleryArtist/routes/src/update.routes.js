const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Update galleryartist
        app.put(
            "/galleryartist/:galleryartist_id/", 
            [
                tokenValid,
                GalleryArtist.Middlewares.canUpdateResource
            ], 
            GalleryArtist.Controller.updateGalleryArtist
        );
    },

    completeProdile: function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Update galleryartist
        app.put(
            "/galleryartist/:galleryartist_id/complete", 
            [
                tokenValid,
            ], 
            GalleryArtist.Controller.completeProfile
        );
    }

};