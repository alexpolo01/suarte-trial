const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a ArtistRequest successfully (200)");

        it ("Update a ArtistRequest with invalid data (400)");

        it ("Update a ArtistRequest with invalid token (401)");

        it ("Update a ArtistRequest with no permission (403)");

        it ("Update a ArtistRequest with invalid id (404)");
    });

};