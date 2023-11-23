const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all GalleryRequests", function () 
        {

            it("Get all GalleryRequests successfully (200) with data");

            it("Get all GalleryRequests successfully (200) without data");

            it("Get all GalleryRequests with invalid token (401)");

            it("Get all GalleryRequests with no permission (403)");

        });

        describe("Get GalleryRequest by id", function () 
        {

            it("Get a GalleryRequest successfully (200)");

            it("Get a GalleryRequest with invalid token (401)");

            it("Get a GalleryRequest with no permission (403)");

            it("Get a GalleryRequest with invalid id (404)");

        });

    });

};