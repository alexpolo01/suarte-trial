const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Thought successfully (200)");

        it ("Create a Thought with invalid data (400)");

        it ("Create a Thought with invalid token (401)");

        it ("Create a Thought with no permission (403)");

        it ("Create a Thought with conflicting data (409)");
    });

};