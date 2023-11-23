const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Delete thought by id
        app.delete(
            "/thought/:thought_id/", 
            [
                deactivateRoute,
                tokenValid,
                Thought.Middlewares.canDeleteResource,
            ], 
            Thought.Controller.deleteThought
        );
    }

};