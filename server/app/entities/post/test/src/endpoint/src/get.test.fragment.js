const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Posts", function () 
        {

            it("Get all Posts successfully (200) with data");

            it("Get all Posts successfully (200) without data");

            it("Get all Posts with invalid token (401)");

            it("Get all Posts with no permission (403)");

        });

        describe("Get Post by id", function () 
        {

            it("Get a Post successfully (200)");

            it("Get a Post with invalid token (401)");

            it("Get a Post with no permission (403)");

            it("Get a Post with invalid id (404)");

        });

    });

};