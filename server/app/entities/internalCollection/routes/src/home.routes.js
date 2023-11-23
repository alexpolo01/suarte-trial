const ModelsService = require("@services/models.service");

module.exports = {
    
    home : function (app)
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Get internalcollection by id
        app.get(
            "/home/:is_mobile",
            [
            ],
            InternalCollection.Controller.getHome
        );
    },
    getNameById : function (app)
    {

        const InternalCollection = ModelsService.Models.InternalCollection;

        // Get internalcollection name by id
        app.get(
            "/home/name/:internalcollection_id",
            [
            ],
            InternalCollection.Controller.getNameById
        );
    }

};