const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Artwork successfully (200)");

        it ("Create a Artwork with invalid data (400)");

        it ("Create a Artwork with invalid token (401)");

        it ("Create a Artwork with no permission (403)");

        it ("Create a Artwork with conflicting data (409)");
    });

};