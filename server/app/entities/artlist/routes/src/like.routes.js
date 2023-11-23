const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    like : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Like artlist
        app.post(
            "/artlist/like/:artlist_id",
            [
                tokenValid,
            ],
            Artlist.Controller.likeArtlist
        );
    },

    unlike : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Unlike artlist
        app.post(
            "/artlist/unlike/:artlist_id",
            [
                tokenValid,
            ],
            Artlist.Controller.unlikeArtlist
        );
    },

    getLikedArtlists : function (app)
    {
        const Artlist = ModelsService.Models.Artlist;

        // Get liked artlists
        app.get(
            "/artlists/liked",
            [
                tokenValid,
            ],
            Artlist.Controller.getLikedArtlists
        );
    }

};