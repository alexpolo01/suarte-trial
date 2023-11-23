const { KaindaModel } = require("kainda");
const mongoose = require("mongoose");

// Import the schemas for the different user types
const userSchema = require("./schemas/baseUser.schema");
const collectorSchema = require("./schemas/collector.schema");
const artistSchema = require("./schemas/artist.schema");
const gallerySchema = require("./schemas/gallery.schema");
const adminSchema = require("./schemas/admin.schema");

// Create the User model
const tmpModel = mongoose.model("User", userSchema);
const User = new KaindaModel(tmpModel);

// Create the different user types
const Collector = new KaindaModel(tmpModel.discriminator("Collector", collectorSchema));
const Artist = new KaindaModel(tmpModel.discriminator("Artist", artistSchema));
const Gallery = new KaindaModel(tmpModel.discriminator("Gallery", gallerySchema));
const Admin = new KaindaModel(tmpModel.discriminator("Admin", adminSchema));

// Add the different user types to the User model
User.Collector = Collector;
User.Artist = Artist;
User.Gallery = Gallery;
User.Admin = Admin;

// Add the follow entity
const Follow = require("./follow.modelsub");
User.Follow = Follow;

// Add a static method to the User model to find a user by email or username
User.fromEmailOrUsername = async function (emailOrUsername, transaction = null) 
{
    let user = null;
    if (!/\S+@\S+\.\S+/.test(emailOrUsername)) 
    {
        user = await tmpModel.findOne({ user_username: emailOrUsername }, {}, { session: transaction });
    }
    else 
    {
        user = await tmpModel.findOne({ user_email: emailOrUsername }, {}, { session: transaction });
    }
    return user;
};

module.exports = User;