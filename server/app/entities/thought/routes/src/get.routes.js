const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Get all thoughts.
        app.get(
            "/thought/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Thought.Controller.getAllThoughts
        );
    },

    get : function (app) 
    {

        const Thought = ModelsService.Models.Thought;

        // Get thought by id
        app.get(
            "/thought/:thought_id/",
            [
                deactivateRoute,
                tokenValid,
                Thought.Middlewares.canReadResource,
            ],
            Thought.Controller.getThoughtById
        );
    },

    getThoughtsByArtwork : function (app)
    {

        const Thought = ModelsService.Models.Thought;

        // Get thought social
        app.get(
            "/thought/artwork/:artwork_id/",
            [
                tokenOptional,
            ],
            Thought.Controller.getThoughtsByArtwork
        );
    },

    getRepliesByThought : function (app)
    {

        const Thought = ModelsService.Models.Thought;

        // Get thought social
        app.get(
            "/thought/replies/:thought_id/",
            [
                tokenOptional,
            ],
            Thought.Controller.getRepliesByThought
        );
    },

    getThoughtsByUser : function (app)
    {

        const Thought = ModelsService.Models.Thought;

        // Get thought social
        app.get(
            "/thought/user/:user_id/",
            [
                tokenOptional,
            ],
            Thought.Controller.getThoughtsByUser
        );
    }

};