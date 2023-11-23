const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Contact successfully (200)");

        it ("Delete a Contact with invalid token (401)");

        it ("Delete a Contact with no permission (403)");

        it ("Delete a Contact with invalid id (404)");
    });

};