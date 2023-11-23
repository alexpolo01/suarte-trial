const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a ArtistRequest successfully (200)");

        it ("Delete a ArtistRequest with invalid token (401)");

        it ("Delete a ArtistRequest with no permission (403)");

        it ("Delete a ArtistRequest with invalid id (404)");
    });

};