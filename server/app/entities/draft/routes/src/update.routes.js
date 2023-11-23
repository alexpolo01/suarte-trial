const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Update draft
        app.put(
            "/draft/:draft_id/", 
            [
                tokenValid,
                Draft.Middlewares.aboutRequiredKeys,
                Draft.Middlewares.mediaRequiredKeys,
                Draft.Middlewares.shippingRequiredKeys,
            ], 
            Draft.Controller.updateDraft
        );
    },

    updateOnChangesRequired : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Update draft on changes required
        app.put(
            "/draft/:draft_id/changes_required", 
            [
                tokenValid,
            ], 
            Draft.Controller.updateOnChangesRequired
        );
    }

};