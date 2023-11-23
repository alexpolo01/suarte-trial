const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 

    uploadImage : function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Create new image
        app.post(
            "/image/direct-upload",
            [
                tokenValid,
            ],
            Draft.Controller.uploadImage
        );
    },

};