const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    automaticRenewal: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Automatic renewal
        app.post(
            "/inventory/automatic-renewal/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.automaticRenewal
        );
    },

    withdrawArtwork: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Withdraw artwork
        app.post(
            "/inventory/withdraw/:artwork_id",
            [
                tokenValid,
            ],
            Artwork.Controller.withdrawArtwork
        );
    }

};