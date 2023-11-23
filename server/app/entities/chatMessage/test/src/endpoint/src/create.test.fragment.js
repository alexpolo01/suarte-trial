const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a ChatMessage successfully (200)");

        it ("Create a ChatMessage with invalid data (400)");

        it ("Create a ChatMessage with invalid token (401)");

        it ("Create a ChatMessage with no permission (403)");

        it ("Create a ChatMessage with conflicting data (409)");
    });

};