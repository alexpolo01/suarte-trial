const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Order successfully (200)");

        it ("Create a Order with invalid data (400)");

        it ("Create a Order with invalid token (401)");

        it ("Create a Order with no permission (403)");

        it ("Create a Order with conflicting data (409)");
    });

};