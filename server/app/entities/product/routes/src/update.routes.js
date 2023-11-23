const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const Product = ModelsService.Models.Product;

        // Update product
        app.put(
            "/product/:product_id/", 
            [
                tokenValid,
                Product.Middlewares.canUpdateResource,
            ], 
            Product.Controller.updateProduct
        );
    }

};