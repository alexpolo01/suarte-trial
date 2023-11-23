const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const Contact = ModelsService.Models.Contact;

        // Create new contact
        app.post(
            "/contact/",
            [
                Contact.Middlewares.canCreateResource,
                Contact.Middlewares.checkRequiredKeys
            ],
            Contact.Controller.createContact
        );
    }

};