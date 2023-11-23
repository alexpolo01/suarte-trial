const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a InternalCollection successfully (200)");

        it ("Delete a InternalCollection with invalid token (401)");

        it ("Delete a InternalCollection with no permission (403)");

        it ("Delete a InternalCollection with invalid id (404)");
    });

};