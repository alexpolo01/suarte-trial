const ModelsService = require("@services/models.service");
const { tokenValid, isAdmin } = require("@services/auth.service");

module.exports = {

    requestLimitedEditions: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Request limited editions
        app.post(
            "/inventory/limited-editions/:artwork_id/request",
            [
                tokenValid,
            ],
            Artwork.Controller.requestLimitedEditions
        );
    },

    getAllLimitedEditionsRequests: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Get requested limited editions
        app.get(
            "/inventory/limited-editions/",
            [
                tokenValid,
                isAdmin
            ],
            Artwork.Controller.getAllLimitedEditionsRequests
        );
    },

    approveLimitedEditions: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Approve limited editions
        app.post(
            "/inventory/limited-editions/:artwork_id/approve",
            [
                tokenValid,
                isAdmin
            ],
            Artwork.Controller.approveLimitedEditions
        );
    },

    rejectLimitedEditions: function (app)
    {

        const Artwork = ModelsService.Models.Artwork;

        // Reject limited editions
        app.post(
            "/inventory/limited-editions/:artwork_id/reject",
            [
                tokenValid,
                isAdmin
            ],
            Artwork.Controller.rejectLimitedEditions
        );
    }

};
