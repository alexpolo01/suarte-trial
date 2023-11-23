const GalleryArtist = require("@entities/galleryArtist/model");

GalleryArtist.Controller = require("@entities/galleryArtist/controllers");
GalleryArtist.Routes = require("@entities/galleryArtist/routes");
GalleryArtist.Exceptions = require("@entities/galleryArtist/exceptions");
GalleryArtist.Seeders = require("@entities/galleryArtist/seeders");
GalleryArtist.Middlewares = require("@entities/galleryArtist/middlewares");
GalleryArtist.Validators = require("@entities/galleryArtist/validators");

/**
 * VARIABLES
*/
GalleryArtist.create_required_keys = [
    "artist_name",
    "artist_nationality",
    "artist_birth",
];

GalleryArtist.updateable_keys = [
    "artist_name",
    "artist_email",
    "artist_nationality",
    "artist_birth",
    "artist_death",
    "artist_should_request_email",
    "artist",
    "gallery"
];

GalleryArtist.seed_options = {
    seed : false,
    dependencies: [
        require("@entities/user"),
    ],
    is_seeded: false,
    oldRecords: "dontSeedIfRecordsExists",
    data: GalleryArtist.Seeders.data
};

module.exports = GalleryArtist;