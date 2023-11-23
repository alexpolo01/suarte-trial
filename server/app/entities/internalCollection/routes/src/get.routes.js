const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {
        const InternalCollection = ModelsService.Models.InternalCollection;

        // Get all internalcollections.
        app.get(
            "/internalcollection/:is_mobile",
            [
                //deactivateRoute,
                tokenValid,
            ],
            InternalCollection.Controller.getAllInternalCollections
        );
    },

    get : function (app) 
    {
        const InternalCollection = ModelsService.Models.InternalCollection;

        // Get internalcollection by id
        app.get(
            "/internalcollection/:internalcollection_id",
            [
                tokenValid,
                InternalCollection.Middlewares.canReadResource,
            ],
            InternalCollection.Controller.getInternalCollectionById
        );
    },

    getArtworksPaginatedByName : function (app)
    {
        const InternalCollection = ModelsService.Models.InternalCollection;

        // Get internalcollection by id
        app.get(
            "/category/:collection_id/",
            [
            ],
            InternalCollection.Controller.getArtworksPaginatedByName
        );
    }


};