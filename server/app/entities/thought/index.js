const Thought = require("@entities/thought/model");

Thought.Controller = require("@entities/thought/controllers");
Thought.Routes = require("@entities/thought/routes");
Thought.Exceptions = require("@entities/thought/exceptions");
Thought.Seeders = require("@entities/thought/seeders");
Thought.Middlewares = require("@entities/thought/middlewares");
Thought.Validators = require("@entities/thought/validators");

/**
 * VARIABLES
*/
Thought.create_required_keys = [

];

Thought.updateable_keys = [

];

Thought.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Thought.Seeders.data
};

module.exports = Thought;