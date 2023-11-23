const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    getArtworks : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get artworks from gallery by id
        app.get(
            "/artworks/:gallery_id/", 
            [
            ], 
            Artwork.Controller.getArtworks
        );
    },

    getDrafts : function (app)
    {
        const Artwork = ModelsService.Models.Artwork;

        // Get drafts from gallery by id
        app.get(
            "/drafts/", 
            [
                tokenValid,
            ], 
            Artwork.Controller.getDrafts
        );
    }

};