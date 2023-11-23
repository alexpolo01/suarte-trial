const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all GalleryArtists", function () 
        {

            it("Get all GalleryArtists successfully (200) with data");

            it("Get all GalleryArtists successfully (200) without data");

            it("Get all GalleryArtists with invalid token (401)");

            it("Get all GalleryArtists with no permission (403)");

        });

        describe("Get GalleryArtist by id", function () 
        {

            it("Get a GalleryArtist successfully (200)");

            it("Get a GalleryArtist with invalid token (401)");

            it("Get a GalleryArtist with no permission (403)");

            it("Get a GalleryArtist with invalid id (404)");

        });

    });

};