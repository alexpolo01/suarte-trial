const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all ArtistRequests", function () 
        {

            it("Get all ArtistRequests successfully (200) with data");

            it("Get all ArtistRequests successfully (200) without data");

            it("Get all ArtistRequests with invalid token (401)");

            it("Get all ArtistRequests with no permission (403)");

        });

        describe("Get ArtistRequest by id", function () 
        {

            it("Get a ArtistRequest successfully (200)");

            it("Get a ArtistRequest with invalid token (401)");

            it("Get a ArtistRequest with no permission (403)");

            it("Get a ArtistRequest with invalid id (404)");

        });

    });

};