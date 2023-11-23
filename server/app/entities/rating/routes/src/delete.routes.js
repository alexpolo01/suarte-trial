const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Rating = ModelsService.Models.Rating;

        // Delete rating by id
        app.delete(
            "/rating/:rating_id/", 
            [
                deactivateRoute,
                tokenValid,
                Rating.Middlewares.canDeleteResource,
            ], 
            Rating.Controller.deleteRating
        );
    }

};