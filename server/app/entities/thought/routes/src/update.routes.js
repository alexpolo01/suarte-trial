const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Update thought
        app.put(
            "/thought/:thought_id/", 
            [
                deactivateRoute,
                tokenValid,
                Thought.Middlewares.canUpdateResource,
            ], 
            Thought.Controller.updateThought
        );
    }

};