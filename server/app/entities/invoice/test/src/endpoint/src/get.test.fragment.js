const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Invoices", function () 
        {

            it("Get all Invoices successfully (200) with data");

            it("Get all Invoices successfully (200) without data");

            it("Get all Invoices with invalid token (401)");

            it("Get all Invoices with no permission (403)");

        });

        describe("Get Invoice by id", function () 
        {

            it("Get a Invoice successfully (200)");

            it("Get a Invoice with invalid token (401)");

            it("Get a Invoice with no permission (403)");

            it("Get a Invoice with invalid id (404)");

        });

    });

};