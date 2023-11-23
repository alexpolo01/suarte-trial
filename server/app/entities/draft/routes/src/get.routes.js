const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Get all drafts.
        app.get(
            "/draft/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            Draft.Controller.getAllDrafts
        );
    },

    getPendingDrafts : function (app) 
    {
        
        const Draft = ModelsService.Models.Draft;

        // Get pending drafts
        app.get(
            "/draft/status/:status/",
            [
                tokenValid,
                isAdmin
            ],
            Draft.Controller.getPendingDrafts
        );
    },

    get : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Get draft by id
        app.get(
            "/draft/:draft_id/",
            [
                deactivateRoute,
                tokenValid,
                Draft.Middlewares.canReadResource,
            ],
            Draft.Controller.getDraftById
        );
    }

};