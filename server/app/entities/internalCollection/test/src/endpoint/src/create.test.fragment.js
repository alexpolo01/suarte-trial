const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a InternalCollection successfully (200)");

        it ("Create a InternalCollection with invalid data (400)");

        it ("Create a InternalCollection with invalid token (401)");

        it ("Create a InternalCollection with no permission (403)");

        it ("Create a InternalCollection with conflicting data (409)");
    });

};