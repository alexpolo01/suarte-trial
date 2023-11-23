const ModelsService = require("@services/models.service");

module.exports = {
    
    getAll : function (app) 
    {

        const Artlist = ModelsService.Models.Artlist;

        // Search artlists.
        app.get(
            "/search/artlist/",
            [
            ],
            Artlist.Controller.searchArtlist
        );
    },

};