const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Review = ModelsService.Models.Review;

        // Update review
        app.put(
            "/review/:review_id/", 
            [
                deactivateRoute,
                tokenValid,
                Review.Middlewares.canUpdateResource,
            ], 
            Review.Controller.updateReview
        );
    }

};