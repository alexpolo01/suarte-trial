const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");
//const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Delete internalcollection by id
        app.delete(
            "/internalcollection/:internalcollection_id/", 
            [
                //deactivateRoute,
                tokenValid,
                //InternalCollection.Middlewares.canDeleteResource,
            ], 
            InternalCollection.Controller.deleteInternalCollection
        );

        app.delete(
            "/internalcollection/:internalcollection_id/artwork/:artwork_id", 
            [
                tokenValid,
                isAdmin
            ], 
            InternalCollection.Controller.deleteArtworkFromCollection
        );
    }

};