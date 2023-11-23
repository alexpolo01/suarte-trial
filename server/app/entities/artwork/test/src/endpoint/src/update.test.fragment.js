const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Artwork successfully (200)");

        it ("Update a Artwork with invalid data (400)");

        it ("Update a Artwork with invalid token (401)");

        it ("Update a Artwork with no permission (403)");

        it ("Update a Artwork with invalid id (404)");
    });

};