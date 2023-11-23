const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    getAll : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Get all orders.
        app.get(
            "/orders/:order_status/",
            [
                tokenValid,
            ],
            Order.Controller.getOrders
        );
    },

    get : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Get order by id
        app.get(
            "/order/:order_number/",
            [
                tokenValid,
                Order.Middlewares.canReadResource,
            ],
            Order.Controller.getOrderById
        );
    }

};