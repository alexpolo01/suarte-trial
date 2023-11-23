const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get all artworks.
        app.get(
            "/artwork/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            Artwork.Controller.getAllArtworks
        );
    },

    get : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get artwork by id
        app.get(
            "/artwork/:artwork_id/",
            [
            ],
            Artwork.Controller.getArtworkById
        );
    },

    getArtworkSocial : function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get artwork social
        app.get(
            "/artwork/:artwork_id/social/",
            [
                tokenOptional,
            ],
            Artwork.Controller.getArtworkSocial
        );
    }

};