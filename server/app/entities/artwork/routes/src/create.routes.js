const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Create new artwork
        app.post(
            "/artwork/",
            [
                deactivateRoute,
                tokenValid,
                Artwork.Middlewares.canCreateResource,
                Artwork.Middlewares.checkRequiredKeys
            ],
            Artwork.Controller.createArtwork
        );
    }

};