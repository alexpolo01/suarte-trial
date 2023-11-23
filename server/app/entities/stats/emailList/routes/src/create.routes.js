const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const EmailList = ModelsService.Models.EmailList;

        // Create new emaillist
        app.post(
            "/emaillist/",
            [
            ],
            EmailList.Controller.createEmailList
        );
    }

};