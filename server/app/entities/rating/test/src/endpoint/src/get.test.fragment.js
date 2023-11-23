const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Ratings", function () 
        {

            it("Get all Ratings successfully (200) with data");

            it("Get all Ratings successfully (200) without data");

            it("Get all Ratings with invalid token (401)");

            it("Get all Ratings with no permission (403)");

        });

        describe("Get Rating by id", function () 
        {

            it("Get a Rating successfully (200)");

            it("Get a Rating with invalid token (401)");

            it("Get a Rating with no permission (403)");

            it("Get a Rating with invalid id (404)");

        });

    });

};