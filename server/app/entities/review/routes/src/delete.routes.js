const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Review = ModelsService.Models.Review;

        // Delete review by id
        app.delete(
            "/review/:review_id/", 
            [
                deactivateRoute,
                tokenValid,
                Review.Middlewares.canDeleteResource,
            ], 
            Review.Controller.deleteReview
        );
    }

};