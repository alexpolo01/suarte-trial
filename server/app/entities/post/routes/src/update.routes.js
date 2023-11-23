const ModelsService = require("@services/models.service");
const { tokenValid, isGallery } = require("@services/auth.service");

module.exports = {
    
    update : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Update post
        app.put(
            "/post/:post_id/", 
            [
                tokenValid,
                isGallery,
                Post.Middlewares.canUpdateResource,
            ], 
            Post.Controller.updatePost
        );
    }

};