const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Invoice successfully (200)");

        it ("Delete a Invoice with invalid token (401)");

        it ("Delete a Invoice with no permission (403)");

        it ("Delete a Invoice with invalid id (404)");
    });

};