const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Thoughts", function () 
        {

            it("Get all Thoughts successfully (200) with data");

            it("Get all Thoughts successfully (200) without data");

            it("Get all Thoughts with invalid token (401)");

            it("Get all Thoughts with no permission (403)");

        });

        describe("Get Thought by id", function () 
        {

            it("Get a Thought successfully (200)");

            it("Get a Thought with invalid token (401)");

            it("Get a Thought with no permission (403)");

            it("Get a Thought with invalid id (404)");

        });

    });

};