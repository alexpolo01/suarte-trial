const GalleryRequest = require("@entities/galleryRequest/model");

GalleryRequest.Controller = require("@entities/galleryRequest/controllers");
GalleryRequest.Routes = require("@entities/galleryRequest/routes");
GalleryRequest.Exceptions = require("@entities/galleryRequest/exceptions");
GalleryRequest.Seeders = require("@entities/galleryRequest/seeders");
GalleryRequest.Middlewares = require("@entities/galleryRequest/middlewares");
GalleryRequest.Validators = require("@entities/galleryRequest/validators");

/**
 * VARIABLES
*/
GalleryRequest.create_required_keys = [
    "user_name",
    "user_username",
    "user_email",
    "gallery_business_id",
    "gallery_address",
    "gallery_address.street",
    "gallery_address.city",
    "gallery_address.zip_code",
    "gallery_address.region",
    "gallery_address.country",
    "user_password",
    "gallery_agent", 
    "gallery_agent.agent_name",
    "gallery_agent.agent_gender",
    "gallery_agent.agent_position",
    "gallery_agent.agent_birth",
    "gallery_agent.agent_phone",
    "gallery_agent.agent_phone.phone_prefix",
    "gallery_agent.agent_phone.phone_number",
];

GalleryRequest.updateable_keys = [

];

GalleryRequest.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: GalleryRequest.Seeders.data
};

module.exports = GalleryRequest;