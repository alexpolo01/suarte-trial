const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Reviews", function () 
        {

            it("Get all Reviews successfully (200) with data");

            it("Get all Reviews successfully (200) without data");

            it("Get all Reviews with invalid token (401)");

            it("Get all Reviews with no permission (403)");

        });

        describe("Get Review by id", function () 
        {

            it("Get a Review successfully (200)");

            it("Get a Review with invalid token (401)");

            it("Get a Review with no permission (403)");

            it("Get a Review with invalid id (404)");

        });

    });

};