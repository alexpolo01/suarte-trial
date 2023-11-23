const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Drafts", function () 
        {

            it("Get all Drafts successfully (200) with data");

            it("Get all Drafts successfully (200) without data");

            it("Get all Drafts with invalid token (401)");

            it("Get all Drafts with no permission (403)");

        });

        describe("Get Draft by id", function () 
        {

            it("Get a Draft successfully (200)");

            it("Get a Draft with invalid token (401)");

            it("Get a Draft with no permission (403)");

            it("Get a Draft with invalid id (404)");

        });

    });

};