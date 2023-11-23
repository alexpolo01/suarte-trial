const ModelsService = require("@services/models.service");
const { isAdmin } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Create new internalcollection
        app.post(
            "/internalcollection/",
            [
                isAdmin,
                InternalCollection.Middlewares.checkRequiredKeys
            ],
            InternalCollection.Controller.createInternalCollection
        );
    }

};