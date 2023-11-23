const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    onboardingInfo: function (app) 
    {

        const Artwork = ModelsService.Models.Artwork;
        
        // Get onboarding info
        app.get(
            "/onboarding/artwork/info",
            [
                tokenValid
            ],
            Artwork.Controller.getOnboardingInfo
        );

    }

};