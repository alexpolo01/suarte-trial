const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all ChatMessages", function () 
        {

            it("Get all ChatMessages successfully (200) with data");

            it("Get all ChatMessages successfully (200) without data");

            it("Get all ChatMessages with invalid token (401)");

            it("Get all ChatMessages with no permission (403)");

        });

        describe("Get ChatMessage by id", function () 
        {

            it("Get a ChatMessage successfully (200)");

            it("Get a ChatMessage with invalid token (401)");

            it("Get a ChatMessage with no permission (403)");

            it("Get a ChatMessage with invalid id (404)");

        });

    });

};