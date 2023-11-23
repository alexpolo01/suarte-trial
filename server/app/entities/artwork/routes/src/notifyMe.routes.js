const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    notifyMe: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Add an email to the notify me list
        app.post(
            "/artwork/:artwork_id/notify-me",
            [
                tokenValid,
            ],
            Artwork.Controller.notifyMe
        );
    }
};

