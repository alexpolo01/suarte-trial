const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Draft successfully (200)");

        it ("Create a Draft with invalid data (400)");

        it ("Create a Draft with invalid token (401)");

        it ("Create a Draft with no permission (403)");

        it ("Create a Draft with conflicting data (409)");
    });

};