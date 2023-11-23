const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Rating successfully (200)");

        it ("Update a Rating with invalid data (400)");

        it ("Update a Rating with invalid token (401)");

        it ("Update a Rating with no permission (403)");

        it ("Update a Rating with invalid id (404)");
    });

};