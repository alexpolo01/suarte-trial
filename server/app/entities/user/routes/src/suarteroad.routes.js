const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    suarteRoad: function (app) 
    {

        const User = ModelsService.Models.User;

        // Get all users.
        app.get(
            "/suarteroad/",
            [
                tokenValid,
            ],
            User.Controller.suarteRoad
        );
    },
};