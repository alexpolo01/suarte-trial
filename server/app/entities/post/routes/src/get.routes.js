const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Get all posts.
        app.get(
            "/post/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Post.Controller.getAllPosts
        );
    },

    getIncompletePosts : function (app)
    {

        const Post = ModelsService.Models.Post;

        // Get incomplete posts
        app.get(
            "/posts/status/incomplete",
            [
                tokenValid
            ],
            Post.Controller.getIncompletePosts
        );
    },

    getPostsByGalleryId : function (app)
    {
        const Post = ModelsService.Models.Post;

        // Get posts by gallery id
        app.get(
            "/posts/gallery/:gallery_id/",
            [
                tokenOptional,
            ],
            Post.Controller.getPostsByGalleryId
        );
    },

    get : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Get post by id
        app.get(
            "/post/:post_id/",
            [
                tokenOptional,
                Post.Middlewares.canReadResource,
            ],
            Post.Controller.getPostById
        );
    }

};