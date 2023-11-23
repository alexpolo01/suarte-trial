const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const Post = ModelsService.Models.Post;

        // Delete post by id
        app.delete(
            "/post/:post_id/", 
            [
                tokenValid,
                Post.Middlewares.canDeleteResource,
            ], 
            Post.Controller.deletePost
        );
    }

};