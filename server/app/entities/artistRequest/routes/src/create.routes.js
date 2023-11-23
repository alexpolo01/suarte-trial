const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Create new artistrequest
        app.post(
            "/request/access/artist/",
            [
                ArtistRequest.Middlewares.checkRequiredKeys
            ],
            ArtistRequest.Controller.createArtistRequest
        );
    }

};