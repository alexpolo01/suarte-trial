const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a GalleryRequest successfully (200)");

        it ("Delete a GalleryRequest with invalid token (401)");

        it ("Delete a GalleryRequest with no permission (403)");

        it ("Delete a GalleryRequest with invalid id (404)");
    });

};