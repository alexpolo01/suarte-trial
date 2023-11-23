const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a GalleryRequest successfully (200)");

        it ("Create a GalleryRequest with invalid data (400)");

        it ("Create a GalleryRequest with invalid token (401)");

        it ("Create a GalleryRequest with no permission (403)");

        it ("Create a GalleryRequest with conflicting data (409)");
    });

};