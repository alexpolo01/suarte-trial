const Artwork = require("@entities/artwork/model");

Artwork.Controller = require("@entities/artwork/controllers");
Artwork.Routes = require("@entities/artwork/routes");
Artwork.Exceptions = require("@entities/artwork/exceptions");
Artwork.Seeders = require("@entities/artwork/seeders");
Artwork.Middlewares = require("@entities/artwork/middlewares");
Artwork.Validators = require("@entities/artwork/validators");

/**
 * VARIABLES
*/
Artwork.create_required_keys = [
    "artwork_about",
    "artwork_media",
    "artwork_shipping",
    "artwork_status",
];

Artwork.updateable_keys = [

];

Artwork.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: Artwork.Seeders.data
};

module.exports = Artwork;