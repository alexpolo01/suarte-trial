const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    get : function (app) 
    {

        const Notification = ModelsService.Models.Notification;

        // Get invoice by id
        app.get(
            "/notification/:user_token/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Notification.Controller.getNotificationByToken
        );
    },

};