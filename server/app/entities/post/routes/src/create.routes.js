const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");

module.exports = { 
    
    createPost : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Create new post
        app.post(
            "/post/",
            [
                tokenValid,
                isGallery,
                Post.Middlewares.checkRequiredKeys,
            ],
            Post.Controller.createPost
        );
    }

};