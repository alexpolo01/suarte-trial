const LandingTracking = require("@entities/stats/landingTracking/model");

LandingTracking.Controller = require("@entities/stats/landingTracking/controllers");
LandingTracking.Routes = require("@entities/stats/landingTracking/routes");

/**
 * VARIABLES
*/
LandingTracking.create_required_keys = [
    "full_url",
];

module.exports = LandingTracking;