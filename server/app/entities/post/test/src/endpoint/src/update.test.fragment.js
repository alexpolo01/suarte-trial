const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Post successfully (200)");

        it ("Update a Post with invalid data (400)");

        it ("Update a Post with invalid token (401)");

        it ("Update a Post with no permission (403)");

        it ("Update a Post with invalid id (404)");
    });

};