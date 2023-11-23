const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const LandingTracking = ModelsService.Models.LandingTracking;

        // Get all landingtrackings.
        app.get(
            "/landingtracking/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin,
            ],
            LandingTracking.Controller.getAllLandingTrackings
        );
    },

    get : function (app) 
    {

        const LandingTracking = ModelsService.Models.LandingTracking;

        // Get landingtracking by id
        app.get(
            "/landingtracking/:landingtracking_id/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin,
            ],
            LandingTracking.Controller.getLandingTrackingById
        );
    }

};