const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Artworks", function () 
        {

            it("Get all Artworks successfully (200) with data");

            it("Get all Artworks successfully (200) without data");

            it("Get all Artworks with invalid token (401)");

            it("Get all Artworks with no permission (403)");

        });

        describe("Get Artwork by id", function () 
        {

            it("Get a Artwork successfully (200)");

            it("Get a Artwork with invalid token (401)");

            it("Get a Artwork with no permission (403)");

            it("Get a Artwork with invalid id (404)");

        });

    });

};