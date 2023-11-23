const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");

module.exports = {

    uploadAudio: function (app) 
    {

        const Draft = ModelsService.Models.Draft;

        // Direct upload audio
        app.post(
            "/audio/direct-upload",
            [
                tokenValid,
                isGallery
            ],
            Draft.Controller.uploadAudio
        );
    }

};