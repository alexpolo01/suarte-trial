const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Create new artlist
        app.post(
            "/artlist/",
            [
                Artlist.Middlewares.checkRequiredKeys,
                tokenValid,
                Artlist.Middlewares.canCreateResource,
            ],
            Artlist.Controller.createArtlist
        );
    }

};