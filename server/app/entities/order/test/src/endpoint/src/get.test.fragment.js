const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Orders", function () 
        {

            it("Get all Orders successfully (200) with data");

            it("Get all Orders successfully (200) without data");

            it("Get all Orders with invalid token (401)");

            it("Get all Orders with no permission (403)");

        });

        describe("Get Order by id", function () 
        {

            it("Get a Order successfully (200)");

            it("Get a Order with invalid token (401)");

            it("Get a Order with no permission (403)");

            it("Get a Order with invalid id (404)");

        });

    });

};