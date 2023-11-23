const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Invoice = ModelsService.Models.Invoice;

        // Delete invoice by id
        app.delete(
            "/invoice/:invoice_id/", 
            [
                deactivateRoute,
                tokenValid,
                Invoice.Middlewares.canDeleteResource,
            ], 
            Invoice.Controller.deleteInvoice
        );
    }

};