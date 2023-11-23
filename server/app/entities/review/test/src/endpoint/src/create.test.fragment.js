const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Review successfully (200)");

        it ("Create a Review with invalid data (400)");

        it ("Create a Review with invalid token (401)");

        it ("Create a Review with no permission (403)");

        it ("Create a Review with conflicting data (409)");
    });

};