const Post = require("@entities/post/model");

Post.Controller = require("@entities/post/controllers");
Post.Routes = require("@entities/post/routes");
Post.Exceptions = require("@entities/post/exceptions");
Post.Seeders = require("@entities/post/seeders");
Post.Middlewares = require("@entities/post/middlewares");
Post.Validators = require("@entities/post/validators");

/**
 * VARIABLES
*/
Post.create_required_keys = [

];

Post.updateable_keys = [

];

Post.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Post.Seeders.data
};

module.exports = Post;