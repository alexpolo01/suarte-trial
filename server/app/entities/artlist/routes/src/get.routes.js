const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Get all artlists.
        app.get(
            "/artlist/",
            [
                deactivateRoute,
                tokenValid,
                isAdmin
            ],
            Artlist.Controller.getAllArtlists
        );
    },

    getArtlistsByUserId : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Get all artlists by username
        app.get(
            "/artlist/user/:user_id/",
            [
                tokenOptional,
                Artlist.Middlewares.canReadResource,
            ],
            Artlist.Controller.getArtlistsByUserId
        );

    },

    get : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Get artlist by id
        app.get(
            "/artlist/:artlist_id/",
            [
                tokenOptional,
                Artlist.Middlewares.canReadResource,
            ],
            Artlist.Controller.getArtlistById
        );
    }

};