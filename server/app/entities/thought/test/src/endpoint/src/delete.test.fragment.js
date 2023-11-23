const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Thought successfully (200)");

        it ("Delete a Thought with invalid token (401)");

        it ("Delete a Thought with no permission (403)");

        it ("Delete a Thought with invalid id (404)");
    });

};