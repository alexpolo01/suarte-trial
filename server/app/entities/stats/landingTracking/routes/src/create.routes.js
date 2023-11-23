const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const LandingTracking = ModelsService.Models.LandingTracking;

        // Create new landingtracking
        app.post(
            "/landingtracking/",
            [
            ],
            LandingTracking.Controller.createLandingTracking
        );
    }

};