const SearchType = require("@entities/searchtype/model");

SearchType.Controller = require("@entities/searchtype/controllers");
SearchType.Routes = require("@entities/searchtype/routes");
SearchType.Exceptions = require("@entities/searchtype/exceptions");
SearchType.Seeders = require("@entities/searchtype/seeders");
SearchType.Middlewares = require("@entities/searchtype/middlewares");
SearchType.Validators = require("@entities/searchtype/validators");

/**
 * VARIABLES
*/
SearchType.create_required_keys = [
    "searchtype_email",
    "searchtype_message",
];

SearchType.updateable_keys = [
    "searchtype_title",
    "searchtype_order",
    "searchtype_message",
    "searchtype_status",
];

SearchType.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: SearchType.Seeders.data
};

module.exports = SearchType;