const Review = require("@entities/review/model");

Review.Controller = require("@entities/review/controllers");
Review.Routes = require("@entities/review/routes");
Review.Exceptions = require("@entities/review/exceptions");
Review.Seeders = require("@entities/review/seeders");
Review.Middlewares = require("@entities/review/middlewares");
Review.Validators = require("@entities/review/validators");

/**
 * VARIABLES
*/
Review.create_required_keys = [
    "valoration",
    "is_anonymous",
];

Review.updateable_keys = [

];

Review.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Review.Seeders.data
};

module.exports = Review;