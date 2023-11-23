const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Invoice = ModelsService.Models.Invoice;

        // Get all invoices.
        app.get(
            "/invoice/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Invoice.Controller.getAllInvoices
        );
    },

    get : function (app) 
    {

        const Invoice = ModelsService.Models.Invoice;

        // Get invoice by id
        app.get(
            "/invoice/:invoice_id/",
            [
                deactivateRoute,
                tokenValid,
                Invoice.Middlewares.canReadResource,
            ],
            Invoice.Controller.getInvoiceById
        );
    },

    getAllInvoicesOfUser : function (app)
    {
        const Invoice = ModelsService.Models.Invoice;

        // Get invoice by id
        app.get(
            "/invoices/",
            [
                tokenValid,
                isGallery,
                Invoice.Middlewares.canReadResource,
            ],
            Invoice.Controller.getAllInvoicesOfUser
        );
    }

};