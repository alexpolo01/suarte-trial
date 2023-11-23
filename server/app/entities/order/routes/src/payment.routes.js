const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    beforePayment : function (app)
    {
        const Order = ModelsService.Models.Order;

        // Before payment
        app.get(
            "/payment/:artwork_id",
            [
                tokenValid
            ],
            Order.Controller.beforePayment
        );
    },
    
    createPayment : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Create new payment
        app.post(
            "/payment/new",
            [
                Order.Middlewares.canCreateResource,
                (req, res, next) => Order.Middlewares.checkRequiredKeys(req, res, next, [
                    "artwork_id",
                    "shipping_details",
                ]),
                tokenValid
            ],
            Order.Controller.createPayment
        );
    },

    webhookPayment : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Webhook
        app.post(
            "/payment/webhook",
            [
            ],
            Order.Controller.webhookPayment
        );
    }

};