const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Artwork successfully (200)");

        it ("Delete a Artwork with invalid token (401)");

        it ("Delete a Artwork with no permission (403)");

        it ("Delete a Artwork with invalid id (404)");
    });

};