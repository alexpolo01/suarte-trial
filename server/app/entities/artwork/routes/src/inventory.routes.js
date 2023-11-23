const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    getSold: function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get all artworks sold
        app.get(
            "/inventory/sold",
            [
                tokenValid,
            ],
            Artwork.Controller.getSoldArtworks
        );
    },

    getAvailable: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get all artworks available
        app.get(
            "/inventory/available",
            [
                tokenValid,
            ],
            Artwork.Controller.getAvailableArtworks
        );
    },

    getPending: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get all artworks pending
        app.get(
            "/inventory/pending",
            [
                tokenValid,
            ],
            Artwork.Controller.getPendingArtworks
        );
    },

};