const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Delete draft by id
        app.delete(
            "/draft/:draft_id/", 
            [
                tokenValid,
                Draft.Middlewares.canDeleteResource,
            ], 
            Draft.Controller.deleteDraft
        );
    }

};