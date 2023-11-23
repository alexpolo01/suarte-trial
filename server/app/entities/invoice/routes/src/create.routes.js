const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Invoice = ModelsService.Models.Invoice;

        // Create new invoice
        app.post(
            "/invoice/",
            [
                tokenValid,
                isAdmin,
                Invoice.Middlewares.checkRequiredKeys
            ],
            Invoice.Controller.createInvoice
        );
    }

};