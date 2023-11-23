const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a InternalCollection successfully (200)");

        it ("Update a InternalCollection with invalid data (400)");

        it ("Update a InternalCollection with invalid token (401)");

        it ("Update a InternalCollection with no permission (403)");

        it ("Update a InternalCollection with invalid id (404)");
    });

};