const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    save : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Save artwork
        app.post(
            "/artwork/save/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.saveArtwork
        );
    },

    unsave : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Unsave artwork
        app.post(
            "/artwork/unsave/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.unsaveArtwork
        );
    },

    getSaved : function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get saved artworks
        app.get(
            "/saved/artworks",
            [
                tokenValid,
            ],
            Artwork.Controller.getSavedArtworks
        );
    }

};