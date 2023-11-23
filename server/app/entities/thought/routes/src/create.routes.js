const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Create new thought
        app.post(
            "/thought/:artwork_id",
            [
                tokenValid,
                Thought.Middlewares.canCreateResource,
                Thought.Middlewares.checkRequiredKeys
            ],
            Thought.Controller.createThought
        );
    }

};