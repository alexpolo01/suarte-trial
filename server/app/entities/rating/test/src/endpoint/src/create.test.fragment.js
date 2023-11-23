const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Rating successfully (200)");

        it ("Create a Rating with invalid data (400)");

        it ("Create a Rating with invalid token (401)");

        it ("Create a Rating with no permission (403)");

        it ("Create a Rating with conflicting data (409)");
    });

};