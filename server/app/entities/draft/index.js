const Draft = require("@entities/draft/model");

Draft.Controller = require("@entities/draft/controllers");
Draft.Routes = require("@entities/draft/routes");
Draft.Exceptions = require("@entities/draft/exceptions");
Draft.Seeders = require("@entities/draft/seeders");
Draft.Middlewares = require("@entities/draft/middlewares");
Draft.Validators = require("@entities/draft/validators");

/**
 * VARIABLES
*/
Draft.create_required_keys = [
    "draft_container",
];

Draft.updateable_keys = [
    "draft_container",
    "draft_status",
    "draft_changes",
];

Draft.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: Draft.Seeders.data
};

module.exports = Draft;