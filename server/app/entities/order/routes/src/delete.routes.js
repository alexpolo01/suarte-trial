const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Delete order by id
        app.delete(
            "/order/:order_id/", 
            [
                deactivateRoute,
                tokenValid,
                Order.Middlewares.canDeleteResource,
            ], 
            Order.Controller.deleteOrder
        );
    }

};