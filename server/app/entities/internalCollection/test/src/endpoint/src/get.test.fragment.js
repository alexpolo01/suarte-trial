const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all InternalCollections", function () 
        {

            it("Get all InternalCollections successfully (200) with data");

            it("Get all InternalCollections successfully (200) without data");

            it("Get all InternalCollections with invalid token (401)");

            it("Get all InternalCollections with no permission (403)");

        });

        describe("Get InternalCollection by id", function () 
        {

            it("Get a InternalCollection successfully (200)");

            it("Get a InternalCollection with invalid token (401)");

            it("Get a InternalCollection with no permission (403)");

            it("Get a InternalCollection with invalid id (404)");

        });

    });

};