const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a GalleryArtist successfully (200)");

        it ("Update a GalleryArtist with invalid data (400)");

        it ("Update a GalleryArtist with invalid token (401)");

        it ("Update a GalleryArtist with no permission (403)");

        it ("Update a GalleryArtist with invalid id (404)");
    });

};