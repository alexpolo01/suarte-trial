const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Update order
        app.put(
            "/order/:order_id/", 
            [
                deactivateRoute,
                tokenValid,
                Order.Middlewares.canUpdateResource,
            ], 
            Order.Controller.updateOrder
        );
    }

};