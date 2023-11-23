const Artlist = require("@entities/artlist/model");

Artlist.Controller = require("@entities/artlist/controllers");
Artlist.Routes = require("@entities/artlist/routes");
Artlist.Exceptions = require("@entities/artlist/exceptions");
Artlist.Seeders = require("@entities/artlist/seeders");
Artlist.Middlewares = require("@entities/artlist/middlewares");
Artlist.Validators = require("@entities/artlist/validators");

/**
 * VARIABLES
*/
Artlist.create_required_keys = [
    "artlist_title"
];

Artlist.updateable_keys = [
    "artlist_title",
    "artlist_description",
    "artlist_image",
    "artlist_artworks"
];

Artlist.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: Artlist.Seeders.data
};

module.exports = Artlist;