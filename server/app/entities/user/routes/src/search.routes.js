const ModelsService = require("@services/models.service");
const { tokenOptional } = require("@services/auth.service");

module.exports = {

    searchArtists: function (app) 
    {

        const User = ModelsService.Models.User;

        // Search artist by name
        app.get(
            "/search/artist",
            [
                tokenOptional
            ],
            User.Controller.searchArtists
        );
    },

    searchBothArtistTypes: function (app) 
    {

        const User = ModelsService.Models.User;

        // Search artist by name
        app.get(
            "/search/artist/both",
            [
                tokenOptional
            ],
            User.Controller.searchBothArtistTypes
        );
    },

    searchGalleries: function (app)
    {

        const User = ModelsService.Models.User;

        // Search gallery by name
        app.get(
            "/search/gallery",
            [
                tokenOptional
            ],
            User.Controller.searchGalleries
        );
    },

    searchCollector: function (app)
    {

        const User = ModelsService.Models.User;

        // Search collector by name
        app.get(
            "/search/collector",
            [
                tokenOptional
            ],
            User.Controller.searchCollectors
        );
    },

    searchUsersByUsername : function (app)
    {
        const User = ModelsService.Models.User;

        // Search user by username
        app.get(
            "/search/user",
            [
                tokenOptional
            ],
            User.Controller.searchUsersByUsername
        );
    }

};