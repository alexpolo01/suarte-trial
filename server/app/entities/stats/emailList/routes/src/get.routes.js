const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const EmailList = ModelsService.Models.EmailList;

        // Get all emaillists.
        app.get(
            "/emaillist/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin,
            ],
            EmailList.Controller.getAllEmailLists
        );
    },

    get : function (app) 
    {

        const EmailList = ModelsService.Models.EmailList;

        // Get emaillist by id
        app.get(
            "/emaillist/:emaillist_id/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin,
            ],
            EmailList.Controller.getEmailListById
        );
    }

};