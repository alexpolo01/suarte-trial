const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a User successfully (200)");

        it ("Create a User with email already in use in Firebase (409)");

        it ("Create a User with email already in use in Mongoose (409)");

        it ("Create a User with invalid email (400)");

        it ("Create a User with invalid password, too short (400)");

        it ("Create a User with invalid password, no uppercase (400)");

        it ("Create a User with invalid password, no lowercase (400)");

        it ("Create a User with invalid password, no number (400)");

        it ("Create a User with invalid password, too large (400)");
    });

};