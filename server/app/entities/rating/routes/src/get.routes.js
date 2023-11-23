const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Rating = ModelsService.Models.Rating;

        // Get all ratings.
        app.get(
            "/rating/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Rating.Controller.getAllRatings
        );
    },

    get : function (app) 
    {

        const Rating = ModelsService.Models.Rating;

        // Get rating by id
        app.get(
            "/rating/:rating_id/",
            [
                deactivateRoute,
                tokenValid,
                Rating.Middlewares.canReadResource,
            ],
            Rating.Controller.getRatingById
        );
    },

    getRatingsOfArtwork : function (app)
    {
        const Rating = ModelsService.Models.Rating;

        // Get rating by id
        app.get(
            "/rating/artwork/:artwork_id/",
            [
                tokenOptional,
                Rating.Middlewares.canReadResource,
            ],
            Rating.Controller.getRatingsOfArtwork
        );
    },

    getRatingsOfUser : function (app)
    {
        const Rating = ModelsService.Models.Rating;

        // Get rating by id
        app.get(
            "/rating/user/:user_id/",
            [
                tokenOptional,
                Rating.Middlewares.canReadResource,
            ],
            Rating.Controller.getRatingsOfUser
        );
    }

};