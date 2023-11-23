const ArtistRequest = require("@entities/artistRequest/model");

ArtistRequest.Controller = require("@entities/artistRequest/controllers");
ArtistRequest.Routes = require("@entities/artistRequest/routes");
ArtistRequest.Exceptions = require("@entities/artistRequest/exceptions");
ArtistRequest.Seeders = require("@entities/artistRequest/seeders");
ArtistRequest.Middlewares = require("@entities/artistRequest/middlewares");
ArtistRequest.Validators = require("@entities/artistRequest/validators");

/**
 * VARIABLES
*/
ArtistRequest.create_required_keys = [
    "user_email",
];

ArtistRequest.updateable_keys = [
    "user_code",
];

ArtistRequest.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: ArtistRequest.Seeders.data
};

module.exports = ArtistRequest;