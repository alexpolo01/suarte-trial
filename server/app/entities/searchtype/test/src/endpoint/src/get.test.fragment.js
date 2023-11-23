const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Contacts", function () 
        {

            it("Get all Contacts successfully (200) with data");

            it("Get all Contacts successfully (200) without data");

            it("Get all Contacts with invalid token (401)");

            it("Get all Contacts with no permission (403)");

        });

        describe("Get Contact by id", function () 
        {

            it("Get a Contact successfully (200)");

            it("Get a Contact with invalid token (401)");

            it("Get a Contact with no permission (403)");

            it("Get a Contact with invalid id (404)");

        });

    });

};