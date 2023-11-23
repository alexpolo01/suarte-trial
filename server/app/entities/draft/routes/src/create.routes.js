const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Create new draft
        app.post(
            "/draft/",
            [
                tokenValid,
                Draft.Middlewares.canCreateResource,
                Draft.Middlewares.checkRequiredKeys,
                Draft.Middlewares.aboutRequiredKeys,
                Draft.Middlewares.mediaRequiredKeys,
                Draft.Middlewares.shippingRequiredKeys,
            ],
            Draft.Controller.createDraft
        );
    },

    approve : function (app) 
    {
        
        const Draft = ModelsService.Models.Draft;

        // Approve draft
        app.post(
            "/draft/approve/:draft_id",
            [
                tokenValid,
                isAdmin
            ],
            Draft.Controller.approveDraft
        );
    },

    reject : function (app) 
    {
        
        const Draft = ModelsService.Models.Draft;

        // Reject draft
        app.post(
            "/draft/reject/:draft_id",
            [
                tokenValid,
                isAdmin
            ],
            Draft.Controller.rejectDraft
        );
    }

};