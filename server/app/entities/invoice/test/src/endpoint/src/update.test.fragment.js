const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Invoice successfully (200)");

        it ("Update a Invoice with invalid data (400)");

        it ("Update a Invoice with invalid token (401)");

        it ("Update a Invoice with no permission (403)");

        it ("Update a Invoice with invalid id (404)");
    });

};