const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    like : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Like artwork
        app.post(
            "/artwork/like/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.likeArtwork
        );
    },

    unlike : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Unlike artwork
        app.post(
            "/artwork/unlike/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.unlikeArtwork
        );
    },

    getLikedArtworks : function (app)
    {
        const Artwork = ModelsService.Models.Artwork;

        // Get liked artworks
        app.get(
            "/liked/artworks",
            [
                tokenValid,
            ],
            Artwork.Controller.getLikedArtworks
        );
    }

};