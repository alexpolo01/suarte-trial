const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Draft successfully (200)");

        it ("Update a Draft with invalid data (400)");

        it ("Update a Draft with invalid token (401)");

        it ("Update a Draft with no permission (403)");

        it ("Update a Draft with invalid id (404)");
    });

};