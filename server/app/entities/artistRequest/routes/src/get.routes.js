const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Get all artistrequests.
        app.get(
            "/request/access/artist/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            ArtistRequest.Controller.getAllArtistRequests
        );
    },

    get : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Get artistrequest by id
        app.get(
            "/request/access/artist/:artistrequest_id/",
            [
                deactivateRoute,
                tokenValid,
                ArtistRequest.Middlewares.canReadResource,
            ],
            ArtistRequest.Controller.getArtistRequestById
        );
    }

};