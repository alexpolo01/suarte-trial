const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Review successfully (200)");

        it ("Delete a Review with invalid token (401)");

        it ("Delete a Review with no permission (403)");

        it ("Delete a Review with invalid id (404)");
    });

};