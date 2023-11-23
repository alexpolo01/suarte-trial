const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    like : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Like post
        app.post(
            "/post/like/:post_id",
            [
                tokenValid,
            ],
            Post.Controller.likePost
        );
    },

    unlike : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Unlike post
        app.post(
            "/post/unlike/:post_id",
            [
                tokenValid,
            ],
            Post.Controller.unlikePost
        );
    },

    getLikedPosts : function (app)
    {
        const Post = ModelsService.Models.Post;

        // Get liked posts
        app.get(
            "/posts/liked",
            [
                tokenValid,
            ],
            Post.Controller.getLikedPosts
        );
    }

};