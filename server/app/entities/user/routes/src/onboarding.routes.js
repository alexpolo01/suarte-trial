const ModelsService = require("@services/models.service");
const { tokenValid, isGallery, isArtist, isCollector } = require("@services/auth.service");

module.exports = {

    completeOnboardingCollector: function (app) 
    {

        const User = ModelsService.Models.User;

        // Complete onboarding
        app.put(
            "/collector/onboarding/complete",
            [
                (req, res, next) => 
                {
                    User.Middlewares.checkRequiredKeys(req, res, next, [
                        "user_username",
                        "user_gender",
                        "user_birth",
                    ]);
                },
                tokenValid,
                isCollector,
                User.Middlewares.onboardingComplete
            ],
            User.Controller.completeOnboardingCollector
        );
    },

    completeOnboardingArtist: function (app) 
    {

        const User = ModelsService.Models.User;

        // Complete onboarding
        app.put(
            "/artist/onboarding/complete",
            [
                (req, res, next) => 
                {
                    User.Middlewares.checkRequiredKeys(req, res, next, [
                        "user_name",
                        "user_username",
                        "user_gender",
                        "user_birth",
                    ]);
                },
                tokenValid,
                isArtist,
                User.Middlewares.onboardingComplete
            ],
            User.Controller.completeOnboardingArtist
        );
    },

    completeOnboardingGallery : function (app) 
    {

        const User = ModelsService.Models.User;

        // Complete onboarding
        app.put(
            "/gallery/onboarding/complete", 
            [
                tokenValid,
                isGallery,
            ], 
            User.Controller.completeOnboardingGallery
        );
    },

};