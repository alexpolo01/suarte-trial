const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a ArtistRequest successfully (200)");

        it ("Create a ArtistRequest with invalid data (400)");

        it ("Create a ArtistRequest with invalid token (401)");

        it ("Create a ArtistRequest with no permission (403)");

        it ("Create a ArtistRequest with conflicting data (409)");
    });

};