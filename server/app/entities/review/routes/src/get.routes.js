const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Review = ModelsService.Models.Review;

        // Get all reviews
        app.get(
            "/review/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Review.Controller.getAllReviews
        );
    },

    get : function (app) 
    {

        const Review = ModelsService.Models.Review;

        // Get review by id
        app.get(
            "/review/:review_id/",
            [
                deactivateRoute,
                tokenValid,
                Review.Middlewares.canReadResource,
            ],
            Review.Controller.getReviewById
        );
    },

    getReviewsFromGallery : function (app)
    {
        const Review = ModelsService.Models.Review;

        // Get review by id
        app.get(
            "/reviews/:gallery_id/",
            [
            ],
            Review.Controller.getAllReviewsFromGallery
        );
    }

};