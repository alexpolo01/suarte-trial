const ModelsService = require("@services/models.service");
const { tokenValid, isGallery, tokenOptional } = require("@services/auth.service");

module.exports = {

    getBankData: function (app)
    {
        const User = ModelsService.Models.User;

        // Get user bank data
        app.get(
            "/gallery/bank/",
            [
                tokenValid,
                isGallery
            ],
            User.Controller.getBankData
        );
    },

    getGalleryInfo: function (app)
    {
        const User = ModelsService.Models.User;

        // Get gallery info
        app.get(
            "/gallery/info/",
            [
                tokenValid,
                isGallery
            ],
            User.Controller.getGalleryInfo
        );
    },

    modifyShipping: function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new shipping info or update existing
        app.put(
            "/gallery/shipping/",
            [
                tokenValid,
                isGallery
            ],
            User.Controller.changeShipping
        );
    },

    modifyBankData: function (app)
    {
        const User = ModelsService.Models.User;

        // Create new bank data or update existing
        app.put(
            "/gallery/bank/",
            [
                tokenValid,
                isGallery,
                (req, res, next) => User.Middlewares.checkRequiredKeys(req, res, next, [
                    "bank_name",
                    "swift_code",
                    "account_holder_name",
                    "iban",
                ])
            ],
            User.Controller.changeBankData
        );
    },

    modifyGalleryInfo: function (app)
    {
        const User = ModelsService.Models.User;

        // Create new agent or update existing
        app.put(
            "/gallery/info/",
            [
                tokenValid,
                isGallery,
                (req, res, next) => User.Middlewares.checkRequiredKeys(req, res, next, [
                    "gallery_agent",
                    "gallery_agent.agent_name",
                    "gallery_agent.agent_birth",
                    "gallery_agent.agent_gender",
                    "gallery_agent.agent_phone",
                    "gallery_agent.agent_phone.phone_prefix",
                    "gallery_agent.agent_phone.phone_number",
                ])
            ],
            User.Controller.changeGalleryInfo
        );
    },

    closedMode : function (app)
    {
        const User = ModelsService.Models.User;

        // Change closed mode
        app.put(
            "/gallery/closed/",
            [
                tokenValid,
                isGallery,
            ],
            User.Controller.changeClosedMode
        );
    },

    getProfileArtists : function (app)
    {
        const User = ModelsService.Models.User;

        // Get profile artists
        app.get(
            "/gallery/:gallery_id/artists/",
            [
                tokenOptional,
            ],
            User.Controller.getArtistsProfile
        );
    },

    getArtworksOfArtistInGallery : function (app)
    {
        const User = ModelsService.Models.User;

        // Get artworks of artist in gallery
        app.get(
            "/gallery/:gallery_id/artist/:artist_id/artworks/",
            [
                tokenOptional,
            ],
            User.Controller.getArtworksOfArtistInGallery
        );
    }
};