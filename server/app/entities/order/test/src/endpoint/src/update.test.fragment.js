const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Order successfully (200)");

        it ("Update a Order with invalid data (400)");

        it ("Update a Order with invalid token (401)");

        it ("Update a Order with no permission (403)");

        it ("Update a Order with invalid id (404)");
    });

};