const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Rating = ModelsService.Models.Rating;

        // Update rating
        app.put(
            "/rating/:rating_id/", 
            [
                deactivateRoute,
                tokenValid,
                Rating.Middlewares.canUpdateResource,
            ], 
            Rating.Controller.updateRating
        );
    }

};