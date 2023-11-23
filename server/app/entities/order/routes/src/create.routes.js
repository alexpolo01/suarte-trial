const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Create new order
        app.post(
            "/order/",
            [
                deactivateRoute,
                tokenValid,
                Order.Middlewares.canCreateResource,
                Order.Middlewares.checkRequiredKeys
            ],
            Order.Controller.createOrder
        );
    }

};