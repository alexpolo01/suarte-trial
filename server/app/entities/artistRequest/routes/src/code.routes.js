const ModelsService = require("@services/models.service");

module.exports = {
    
    resendCode : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Resend code
        app.post(
            "/request/access/artist/resend",
            [
            ],
            ArtistRequest.Controller.resendCode
        );

    },

    verifyCode : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Verify code
        app.post(
            "/request/access/artist/verify",
            [
                (req, res, next) => ArtistRequest.Middlewares.checkRequiredKeys(req, res, next, ["oobCode"])
            ],
            ArtistRequest.Controller.verifyCode
        );

    },

    claimProfile : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Claim profile
        app.post(
            "/request/access/artist/confirm",
            [
                (req, res, next) => ArtistRequest.Middlewares.checkRequiredKeys(req, res, next, ["oobCode", "user_password"])
            ],
            ArtistRequest.Controller.createArtistProfile
        );
        
    }

};