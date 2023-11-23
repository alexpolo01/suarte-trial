const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Search endpoint", function () 
    {

        it ("Search for artworks successfully with no query (200)", async function () 
        {
            const response = await supertest(app)
                .get("/search/artwork/")
                .expect(200);
            assert(response.body.data.length > 0);
        });

    });

};