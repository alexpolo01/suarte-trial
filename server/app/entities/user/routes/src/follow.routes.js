const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");

module.exports = {
    follow: function (app) 
    {
        const User = ModelsService.Models.User;

        // Follow a user
        app.post("/user/follow", [tokenValid], User.Controller.followUser);
    },

    unfollow: function (app) 
    {
        const User = ModelsService.Models.User;

        // Unfollow a user
        app.post("/user/unfollow", [tokenValid], User.Controller.unfollowUser);
    },

    getFollowers: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get followers
        app.get(
            "/user/followers/:user_id",
            [tokenOptional],
            User.Controller.getFollowers
        );
    },

    getFollowing: function (app) 
    {
        const User = ModelsService.Models.User;

        // Get followees By me
        app.get(
            "/user/followees/:user_id",
            [tokenOptional],
            User.Controller.getFollowing
        );
    },
};
