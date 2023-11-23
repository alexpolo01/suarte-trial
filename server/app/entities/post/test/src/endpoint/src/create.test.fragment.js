const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Post successfully (200)");

        it ("Create a Post with invalid data (400)");

        it ("Create a Post with invalid token (401)");

        it ("Create a Post with no permission (403)");

        it ("Create a Post with conflicting data (409)");
    });

};