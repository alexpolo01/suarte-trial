const ModelsService = require("@services/models.service");
const { tokenOptional } = require("@services/auth.service");

module.exports = {

    visit : function (app)
    {
        const Artwork = ModelsService.Models.Artwork;

        // Visit artwork
        app.post(
            "/artwork/visit/:artwork_id",
            [
                tokenOptional,
            ],
            Artwork.Controller.newVisit
        );
    }

};