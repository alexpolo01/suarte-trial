const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Contact = ModelsService.Models.Contact;

        // Update contact
        app.put(
            "/contact/:contact_id/", 
            [
                deactivateRoute,
                tokenValid
            ], 
            Contact.Controller.updateContact
        );
    }

};