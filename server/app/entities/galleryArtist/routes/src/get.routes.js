const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Get all galleryartists.
        app.get(
            "/galleryartist/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            GalleryArtist.Controller.getAllGalleryArtists
        );
    },

    get : function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Get galleryartist by id
        app.get(
            "/galleryartist/:galleryartist_id/",
            [
                deactivateRoute,
                tokenValid,
                GalleryArtist.Middlewares.canReadResource,
            ],
            GalleryArtist.Controller.getGalleryArtistById
        );
    }

};