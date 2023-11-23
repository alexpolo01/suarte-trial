const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    openIssue: function (app) 
    {
        const Order = ModelsService.Models.Order;

        // Open issue
        app.post(
            "/issue/new/:order_id/",
            [
                (req, res, next) => 
                {
                    Order.Middlewares.checkRequiredKeys(req, res, next, [
                        "issue_message",
                    ]);
                },
                tokenValid,
            ],
            Order.Controller.openIssue
        );
    },

    closeIssue: function (app)
    {
        const Order = ModelsService.Models.Order;

        // Close issue
        app.post(
            "/issue/close/:order_id/",
            [
                tokenValid,
            ],
            Order.Controller.closeIssue
        );
    },

    involveSuarte: function (app)
    {
        const Order = ModelsService.Models.Order;

        // Involve suarte
        app.post(
            "/issue/involve-suarte/:order_id/",
            [
                tokenValid,
            ],
            Order.Controller.involveSuarte
        );
    }

};