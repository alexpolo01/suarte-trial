const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
module.exports = {
    
    update : function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;
        const Draft = ModelsService.Models.Draft;

        // Update artwork
        app.put(
            "/artwork/:artwork_id/", 
            [
                Draft.Middlewares.aboutRequiredKeys,
                Draft.Middlewares.mediaRequiredKeys,
                Draft.Middlewares.shippingRequiredKeys,
                tokenValid
            ], 
            Artwork.Controller.updateArtwork
        );
    }

};