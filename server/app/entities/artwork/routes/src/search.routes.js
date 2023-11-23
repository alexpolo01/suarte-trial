const ModelsService = require("@services/models.service");

module.exports = {

    searchArtwork: function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;
        
        // Search for artworks
        app.get(
            "/search/artwork/",
            [
            ],
            Artwork.Controller.searchArtworks
        );

    }

};