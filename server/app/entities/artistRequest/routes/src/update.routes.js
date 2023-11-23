const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const ArtistRequest = ModelsService.Models.ArtistRequest;

        // Update artistrequest
        app.put(
            "/request/access/artist/:artistrequest_id/", 
            [
                deactivateRoute,
                tokenValid
            ], 
            ArtistRequest.Controller.updateArtistRequest
        );
    }

};