const ModelsService = require("@services/models.service");

module.exports = { 

    forgotPassword: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/forgot-password",
            [
                (req, res, next) => User.Middlewares.checkRequiredKeys(req, res, next, ["user_email"])
            ],
            User.Controller.forgotPassword
        );

    },

    resetPassword: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/reset-password",
            [
                (req, res, next) => User.Middlewares.checkRequiredKeys(req, res, next, ["user_password"])
            ],
            User.Controller.resetPassword
        );

    },

};