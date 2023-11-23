const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
module.exports = {

    update: function (app) 
    {

        const User = ModelsService.Models.User;

        app.put(
            "/user/profile/",
            [
                tokenValid,
                User.Middlewares.canUpdateResource
            ],
            User.Controller.updateUserInfo
        );

        app.put(
            "/user/me",
            [
                tokenValid,
            ],
            User.Controller.updateUser
        );

        app.put(
            "/user/",
            [
                tokenValid,
            ],
            User.Controller.updateUser
        );

    },

    updatePassword: function (app) 
    {

        const User = ModelsService.Models.User;

        app.put(
            "/user/me/password/",
            [
                tokenValid,
                User.Middlewares.canUpdateResource,
            ],
            User.Controller.updatePassword
        );

        app.put(
            "/user/password/",
            [
                tokenValid,
            ],
            User.Controller.updatePassword
        );

    }

};