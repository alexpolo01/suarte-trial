const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Review = ModelsService.Models.Review;

        // Create new review
        app.post(
            "/review/",
            [
                tokenValid,
                Review.Middlewares.canCreateResource,
                Review.Middlewares.checkRequiredKeys
            ],
            Review.Controller.createReview
        );
    }

};