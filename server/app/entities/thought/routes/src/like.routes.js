const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    like : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Like thought
        app.post(
            "/thought/like/:thought_id",
            [
                tokenValid,
            ],
            Thought.Controller.likeThought
        );
    },

    unlike : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Unlike thought
        app.post(
            "/thought/unlike/:thought_id",
            [
                tokenValid,
            ],
            Thought.Controller.unlikeThought
        );
    },

    getLikedThoughts : function (app)
    {
        const Thought = ModelsService.Models.Thought;

        // Get liked thoughts
        app.get(
            "/thoughts/liked",
            [
                tokenValid,
            ],
            Thought.Controller.getLikedThoughts
        );
    }

};