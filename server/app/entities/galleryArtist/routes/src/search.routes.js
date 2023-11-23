const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    searchArtists: function (app) 
    {

        const GalleryArtist = ModelsService.Models.GalleryArtist;

        // Search artist by name
        app.get(
            "/galleryartist/search/",
            [
                tokenValid
            ],
            GalleryArtist.Controller.searchGalleryArtists
        );
    }

};