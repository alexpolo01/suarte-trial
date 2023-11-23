const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const SearchType = ModelsService.Models.SearchType;

        // Update searchtypes order
        app.put(
            "/searchtypes/order/", 
            [
                tokenValid,
                SearchType.Middlewares.canUpdateResource,
            ], 
            SearchType.Controller.updateSearchTypesOrder
        );
    },

    updateSearchTypeItemOrders : function (app) 
    {

        const SearchType = ModelsService.Models.SearchType;

        // Update searchtypes order
        app.put(
            "/searchtypes/:type_id/order/", 
            [
                tokenValid,
                SearchType.Middlewares.canUpdateResource,
            ], 
            SearchType.Controller.updateSearchTypeItemOrders
        );
    },
};