const ModelsService = require("@services/models.service");
const {
    tokenValid,
    tokenOptional,
    isAdmin,
} = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    getAll: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get all users.
        app.get(
            "/user/",
            [deactivateRoute, tokenValid, isAdmin],
            User.Controller.getAllUsers
        );
    },

    getMe: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get user by token
        app.get("/user/me/", [tokenValid], User.Controller.getMe);
    },

    getByUsername: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get user by username
        app.get(
            "/user/username/:username/",
            [tokenOptional, User.Middlewares.canReadResource],
            User.Controller.getUserByUsername
        );
    },

    getById: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get user by id
        app.get(
            "/user/:user_id/",
            [deactivateRoute, tokenValid, User.Middlewares.canReadResource],
            User.Controller.getUserById
        );
    },

    getFakeRankings: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get fake rankings
        app.get("/rankings/", [tokenOptional], User.Controller.getFakeRankings);
    },

    getUserProfileDataById: function (app) 
    {
        const User = ModelsService.Models.User;

        app.get(
            "/user/userProfile/:user_id",
            [],
            User.Controller.getUserProfileDataById
        );
    },
};
