const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Update artlist
        app.put(
            "/artlist/:artlist_id/", 
            [
                tokenValid,
                Artlist.Middlewares.canUpdateResource
            ], 
            Artlist.Controller.updateArtlist
        );
    }

};