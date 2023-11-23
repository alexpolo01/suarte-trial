const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a GalleryArtist successfully (200)");

        it ("Delete a GalleryArtist with invalid token (401)");

        it ("Delete a GalleryArtist with no permission (403)");

        it ("Delete a GalleryArtist with invalid id (404)");
    });

};