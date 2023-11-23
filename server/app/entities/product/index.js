const Product = require("@entities/product/model");

Product.Controller = require("@entities/product/controllers");
Product.Routes = require("@entities/product/routes");
Product.Exceptions = require("@entities/product/exceptions");
Product.Seeders = require("@entities/product/seeders");
Product.Middlewares = require("@entities/product/middlewares");
Product.Validators = require("@entities/product/validators");

/**
 * VARIABLES
*/
Product.create_required_keys = [

];

Product.updateable_keys = [
    "product_metadata"
];

Product.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Product.Seeders.data
};

module.exports = Product;