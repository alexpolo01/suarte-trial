const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    referrals: function (app) 
    {

        const User = ModelsService.Models.User;

        // Get my referrals
        app.get(
            "/referrals/",
            [
                tokenValid,
            ],
            User.Controller.getReferrals
        );
    },

};