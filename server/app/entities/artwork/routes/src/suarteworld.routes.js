const ModelsService = require("@services/models.service");
const { tokenOptional } = require("@services/auth.service");

module.exports = {

    suarteWorld : function (app)
    {
        const Artwork = ModelsService.Models.Artwork;

        // Visit artwork
        app.get(
            "/suarteworld",
            [
                tokenOptional,
            ],
            Artwork.Controller.suarteWorld
        );
    }

};