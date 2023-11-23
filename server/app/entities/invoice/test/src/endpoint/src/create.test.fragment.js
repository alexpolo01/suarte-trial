const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Invoice successfully (200)");

        it ("Create a Invoice with invalid data (400)");

        it ("Create a Invoice with invalid token (401)");

        it ("Create a Invoice with no permission (403)");

        it ("Create a Invoice with conflicting data (409)");
    });

};