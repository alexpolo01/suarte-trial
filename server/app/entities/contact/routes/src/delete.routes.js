const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Contact = ModelsService.Models.Contact;

        // Delete contact by id
        app.delete(
            "/contact/:contact_id/", 
            [
                deactivateRoute,
                tokenValid,
                Contact.Middlewares.canDeleteResource,
            ], 
            Contact.Controller.deleteContact
        );
    }

};