const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Create new galleryartist
        app.post(
            "/galleryartist/",
            [
                tokenValid,
                GalleryArtist.Middlewares.canCreateResource,
                GalleryArtist.Middlewares.checkRequiredKeys
            ],
            GalleryArtist.Controller.createGalleryArtist
        );
    }

};