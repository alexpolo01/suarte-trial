const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    createAddress : function (app) 
    {
        const User = ModelsService.Models.User;

        // Create new address
        app.post(
            "/address/",
            [
                tokenValid,
                (req, res, next) => 
                {
                    User.Middlewares.checkRequiredKeys(req, res, next, [
                        "address_name",
                        "address_surname",
                        "address_phone",
                        "address_phone.address_phone_prefix",
                        "address_phone.address_phone_number",
                        "address_region",
                        "address_country",
                        "address_street",
                        "address_city",
                        "address_zip_code",                    
                    ]);
                }
            ],
            User.Controller.createUserAddress
        );
    },

    getAddress: function (app)
    {
        const User = ModelsService.Models.User;

        // Get user addresses
        app.get(
            "/address/",
            [
                tokenValid,
            ],
            User.Controller.getUserAddress
        );
    },

    updateAdress: function (app)
    {
        const User = ModelsService.Models.User;

        // Update user address
        app.put(
            "/address/:id",
            [
                tokenValid,
                (req, res, next) => 
                {
                    User.Middlewares.checkRequiredKeys(req, res, next, [
                        "address_name",
                        "address_surname",
                        "address_phone",
                        "address_phone.address_phone_prefix",
                        "address_phone.address_phone_number",
                        "address_region",
                        "address_country",
                        "address_street",
                        "address_city",
                        "address_zip_code",                    
                    ]);
                }
            ],
            User.Controller.updateUserAddress
        );
    },

    deleteAddress: function (app)
    {
        const User = ModelsService.Models.User;

        // Delete user address
        app.delete(
            "/address/:id",
            [
                tokenValid,
            ],
            User.Controller.deleteUserAddress
        );
    }

};