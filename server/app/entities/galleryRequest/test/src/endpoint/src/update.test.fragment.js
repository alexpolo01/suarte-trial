const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a GalleryRequest successfully (200)");

        it ("Update a GalleryRequest with invalid data (400)");

        it ("Update a GalleryRequest with invalid token (401)");

        it ("Update a GalleryRequest with no permission (403)");

        it ("Update a GalleryRequest with invalid id (404)");
    });

};