const Contact = require("@entities/contact/model");

Contact.Controller = require("@entities/contact/controllers");
Contact.Routes = require("@entities/contact/routes");
Contact.Exceptions = require("@entities/contact/exceptions");
Contact.Seeders = require("@entities/contact/seeders");
Contact.Middlewares = require("@entities/contact/middlewares");
Contact.Validators = require("@entities/contact/validators");

/**
 * VARIABLES
*/
Contact.create_required_keys = [
    "contact_email",
    "contact_message",
];

Contact.updateable_keys = [
    "contact_name",
    "contact_email",
    "contact_message",
    "contact_status",
];

Contact.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: Contact.Seeders.data
};

module.exports = Contact;