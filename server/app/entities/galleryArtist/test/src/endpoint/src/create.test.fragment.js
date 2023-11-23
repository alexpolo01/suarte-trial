const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a GalleryArtist successfully (200)");

        it ("Create a GalleryArtist with invalid data (400)");

        it ("Create a GalleryArtist with invalid token (401)");

        it ("Create a GalleryArtist with no permission (403)");

        it ("Create a GalleryArtist with conflicting data (409)");
    });

};