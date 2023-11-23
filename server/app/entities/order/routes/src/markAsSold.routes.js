const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");

module.exports = {
    
    markAsSold : function (app) 
    {

        const Order = ModelsService.Models.Order;
        app.post(
            "/mark-as-sold/:artwork_id/",
            [
                (req, res, next) => 
                { 
                    Order.Middlewares.checkRequiredKeys(req, res, next, ["user_email"]);
                },
                tokenValid,
                isGallery
            ],
            Order.Controller.markAsSold
        );
    },

    claimArtwork : function (app)
    {
        const Order = ModelsService.Models.Order;
        app.post(
            "/claim/",
            [
                tokenValid,
            ],
            Order.Controller.claimArtwork
        );
    },

    getSoldData : function (app) 
    {

        const Order = ModelsService.Models.Order;

        // Get the information of the sold artwork
        app.get(
            "/artwork/:artwork_id/sold-details/",
            [
                tokenValid,
            ],
            Order.Controller.getSoldData
        );
    }

};