const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Delete artlist by id
        app.delete(
            "/artlist/:artlist_id/", 
            [
                tokenValid,
                Artlist.Middlewares.canDeleteResource,
            ], 
            Artlist.Controller.deleteArtlist
        );
    }

};