const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");

module.exports = {
    
    addArtworkToCollection : function (app)
    {
        const InternalCollection = ModelsService.Models.InternalCollection;

        // Add artwork to collection
        app.post(
            "/collection/:collection_id/artwork/:artwork_id",
            [
                tokenValid,
                isAdmin
            ],
            InternalCollection.Controller.addArtworkToCollection
        );
    }

};