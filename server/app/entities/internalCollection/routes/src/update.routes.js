const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Update internalcollection
        app.put(
            "/internalcollection/:internalcollection_id/", 
            [
                deactivateRoute,
                tokenValid,
                InternalCollection.Middlewares.canUpdateResource,
            ], 
            InternalCollection.Controller.updateInternalCollection
        );
    },

    updateCollectionName: function (app)
    {
        const InternalCollection = ModelsService.Models.InternalCollection;

        // Update internalcollection
        app.put(
            "/internalcollection/name/:internalcollection_id/", 
            [
                tokenValid,
                InternalCollection.Middlewares.canUpdateResource,
            ], 
            InternalCollection.Controller.updateCollectionName
        );
    },

    updateArtworksOrder : function (app) 
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Update internalcollection
        app.put(
            "/internalcollection/updateartworksorder/:internalcollection_id/", 
            [
                //deactivateRoute,
                tokenValid,
                InternalCollection.Middlewares.canUpdateResource,
            ], 
            InternalCollection.Controller.updateCollectionArtworkOrders
        );
    },

    updateCollectionsOrder : function (app) 
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Update internalcollection
        app.put(
            "/internalcollection/updateorder/:is_mobile/", 
            [
                tokenValid,
                InternalCollection.Middlewares.canUpdateResource,
            ], 
            InternalCollection.Controller.updateCollectionsOrder
        );
    }

};