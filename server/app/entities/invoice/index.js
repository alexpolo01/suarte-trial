const Invoice = require("@entities/invoice/model");

Invoice.Controller = require("@entities/invoice/controllers");
Invoice.Routes = require("@entities/invoice/routes");
Invoice.Exceptions = require("@entities/invoice/exceptions");
Invoice.Seeders = require("@entities/invoice/seeders");
Invoice.Middlewares = require("@entities/invoice/middlewares");
Invoice.Validators = require("@entities/invoice/validators");

/**
 * VARIABLES
*/
Invoice.create_required_keys = [
    "invoice_owner",
    "invoice_name",
    "invoice_start_date",
    "invoice_end_date",
    "invoice_url",
];

Invoice.updateable_keys = [

];

Invoice.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Invoice.Seeders.data
};

module.exports = Invoice;