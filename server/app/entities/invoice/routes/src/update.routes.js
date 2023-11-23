const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Invoice = ModelsService.Models.Invoice;

        // Update invoice
        app.put(
            "/invoice/:invoice_id/", 
            [
                deactivateRoute,
                tokenValid,
                Invoice.Middlewares.canUpdateResource,
            ], 
            Invoice.Controller.updateInvoice
        );
    }

};