const InternalCollection = require("@entities/internalCollection/model");

InternalCollection.Controller = require("@entities/internalCollection/controllers");
InternalCollection.Routes = require("@entities/internalCollection/routes");
InternalCollection.Exceptions = require("@entities/internalCollection/exceptions");
InternalCollection.Seeders = require("@entities/internalCollection/seeders");
InternalCollection.Middlewares = require("@entities/internalCollection/middlewares");
InternalCollection.Validators = require("@entities/internalCollection/validators");

/**
 * VARIABLES
*/
InternalCollection.create_required_keys = [
    "collection_name",
    "collection_id"
];

InternalCollection.updateable_keys = [

];

InternalCollection.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: InternalCollection.Seeders.data
};

module.exports = InternalCollection;