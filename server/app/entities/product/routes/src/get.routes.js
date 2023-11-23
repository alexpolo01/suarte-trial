const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Product = ModelsService.Models.Product;

        // Get all products.
        app.get(
            "/product/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Product.Controller.getAllProducts
        );
    },

    get : function (app) 
    {

        const Product = ModelsService.Models.Product;

        // Get product by id
        app.get(
            "/product/:product_id/",
            [
                deactivateRoute,
                tokenValid,
                Product.Middlewares.canReadResource,
            ],
            Product.Controller.getProductById
        );
    },

    getCollection : function (app)
    {

        const Product = ModelsService.Models.Product;

        // Get product by id
        app.get(
            "/collection/:user_id/",
            [
                tokenOptional,
                Product.Middlewares.canReadResource,
            ],
            Product.Controller.getCollectionByUserId
        );
    }

};