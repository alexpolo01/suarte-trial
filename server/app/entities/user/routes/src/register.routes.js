const ModelsService = require("@services/models.service");

module.exports = { 

    register: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/register",
            [
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.createUser
        );
    },

};