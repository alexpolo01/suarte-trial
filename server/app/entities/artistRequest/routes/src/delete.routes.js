const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Delete artistrequest by id
        app.delete(
            "/request/access/artist/:artistrequest_id/", 
            [
                deactivateRoute,
                tokenValid,
                ArtistRequest.Middlewares.canDeleteResource,
            ], 
            ArtistRequest.Controller.deleteArtistRequest
        );
    }

};