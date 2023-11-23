const Order = require("@entities/order/model");

Order.Controller = require("@entities/order/controllers");
Order.Routes = require("@entities/order/routes");
Order.Exceptions = require("@entities/order/exceptions");
Order.Seeders = require("@entities/order/seeders");
Order.Middlewares = require("@entities/order/middlewares");
Order.Validators = require("@entities/order/validators");

/**
 * VARIABLES
*/
Order.create_required_keys = [];

Order.updateable_keys = [
    "order_tracking",
    "order_issue"
];

Order.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Order.Seeders.data
};

module.exports = Order;