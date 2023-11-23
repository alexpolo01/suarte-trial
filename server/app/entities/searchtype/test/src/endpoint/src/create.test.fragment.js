const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Contact successfully (200)");

        it ("Create a Contact with invalid data (400)");

        it ("Create a Contact with invalid token (401)");

        it ("Create a Contact with no permission (403)");

        it ("Create a Contact with conflicting data (409)");
    });

};