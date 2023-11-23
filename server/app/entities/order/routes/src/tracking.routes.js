const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    addTracking : function (app)
    {
        const Order = ModelsService.Models.Order;

        // Add tracking
        app.put(
            "/order/:order_number/tracking",
            [
                tokenValid,
                (req, res, next) =>
                {
                    Order.Middlewares.checkRequiredKeys(req, res, next, [
                        "tracking_number",
                        "shipping_courier_company",
                    ]);
                }
            ],
            Order.Controller.addTracking
        );
    },

    confirmReception : function (app)
    {
        const Order = ModelsService.Models.Order;

        // Confirm reception
        app.put(
            "/order/:order_number/confirm-reception",
            [
                tokenValid,
            ],
            Order.Controller.confirmReception
        );
    }

};