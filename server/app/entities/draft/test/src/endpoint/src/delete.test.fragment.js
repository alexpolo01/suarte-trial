const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Draft successfully (200)");

        it ("Delete a Draft with invalid token (401)");

        it ("Delete a Draft with no permission (403)");

        it ("Delete a Draft with invalid id (404)");
    });

};