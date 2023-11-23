const ModelsService = require("@services/models.service");

module.exports = { 
    
    checkUsername : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/username/available/",
            [
            ],
            User.Controller.checkUsername
        );
    }

};