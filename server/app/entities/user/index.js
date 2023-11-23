const User = require("@entities/user/model");

User.Controller = require("@entities/user/controllers");
User.Routes = require("@entities/user/routes");
User.Exceptions = require("@entities/user/exceptions");
User.Seeders = require("@entities/user/seeders");
User.Middlewares = require("@entities/user/middlewares");
User.Validators = require("@entities/user/validators");

/**
 * VARIABLES
*/
User.create_required_keys = [
    "user_email",
    "user_password",
];

User.updateable_keys = [
    "user_username",
    "user_preferences",
    "user_birth",
    "user_gender",
    "user_profile_info",
];

User.seed_options = {
    seed : true,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: User.Seeders.data
};

module.exports = User;