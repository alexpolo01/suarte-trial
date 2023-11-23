const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    getAll: function (app) 
    {

        const SearchType = ModelsService.Models.SearchType;

        // Get all SearchTypes.
        app.get(
            "/searchtypes/",
            [],
            SearchType.Controller.getAllSearchTypes
        );
    },

    get: function (app) 
    {

        const SearchType = ModelsService.Models.SearchType;

        // Get contact by id
        app.get(
            "/searchtype/:type_id/",
            [
                tokenValid,
                SearchType.Middlewares.canReadResource,
            ],
            SearchType.Controller.getSearchTypeById
        );
    }

};