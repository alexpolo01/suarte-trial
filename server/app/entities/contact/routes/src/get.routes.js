const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    getAll: function (app) 
    {

        const Contact = ModelsService.Models.Contact;

        // Get all contacts.
        app.get(
            "/contact/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            Contact.Controller.getAllContacts
        );
    },

    get: function (app) 
    {

        const Contact = ModelsService.Models.Contact;

        // Get contact by id
        app.get(
            "/contact/:contact_id/",
            [
                deactivateRoute,
                tokenValid,
                Contact.Middlewares.canReadResource,
            ],
            Contact.Controller.getContactById
        );
    }

};