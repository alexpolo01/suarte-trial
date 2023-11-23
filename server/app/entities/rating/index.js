const Rating = require("@entities/rating/model");

Rating.Controller = require("@entities/rating/controllers");
Rating.Routes = require("@entities/rating/routes");
Rating.Exceptions = require("@entities/rating/exceptions");
Rating.Seeders = require("@entities/rating/seeders");
Rating.Middlewares = require("@entities/rating/middlewares");
Rating.Validators = require("@entities/rating/validators");

/**
 * VARIABLES
*/
Rating.create_required_keys = [
    "emotions",
    "style",
    "time_travel",
];

Rating.updateable_keys = [

];

Rating.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Rating.Seeders.data
};

module.exports = Rating;