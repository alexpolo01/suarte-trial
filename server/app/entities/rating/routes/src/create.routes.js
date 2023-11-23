const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Rating = ModelsService.Models.Rating;

        // Create new rating
        app.post(
            "/rating/:artwork_id",
            [
                tokenValid,
                Rating.Middlewares.canCreateResource,
                Rating.Middlewares.checkRequiredKeys
            ],
            Rating.Controller.createRating
        );
    }

};