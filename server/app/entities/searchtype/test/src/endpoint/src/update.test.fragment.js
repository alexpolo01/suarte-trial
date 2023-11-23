const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Contact successfully (200)");

        it ("Update a Contact with invalid data (400)");

        it ("Update a Contact with invalid token (401)");

        it ("Update a Contact with no permission (403)");

        it ("Update a Contact with invalid id (404)");
    });

};