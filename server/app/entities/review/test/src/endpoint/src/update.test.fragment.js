const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Review successfully (200)");

        it ("Update a Review with invalid data (400)");

        it ("Update a Review with invalid token (401)");

        it ("Update a Review with no permission (403)");

        it ("Update a Review with invalid id (404)");
    });

};