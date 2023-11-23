const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Order successfully (200)");

        it ("Delete a Order with invalid token (401)");

        it ("Delete a Order with no permission (403)");

        it ("Delete a Order with invalid id (404)");
    });

};