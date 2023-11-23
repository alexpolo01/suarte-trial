const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {

        const artlist_data = {
            artlist_title: "Artlist title",
            artlist_description: "Artlist description from delete test",
        };

        let collector = null;
        let artist = null;

        before(async function () 
        {
            collector = await collectorToken(app);
            artist = await artistToken(app);
        });

        beforeEach(async function () 
        {
            delete artlist_data._id;
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send(artlist_data);
            artlist_data._id = response.body._id;
        });

        afterEach(async function () 
        {
            if (artlist_data._id) 
            {
                await supertest(app)
                    .delete(`/artlist/${artlist_data._id}`)
                    .set("Authorization", collector.token);
            }
        });

        it ("Delete a Artlist successfully (200)", async function () 
        {
            const response = await supertest(app)
                .delete(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .expect(200);
            assert(response.body._id);
            assert(response.body.artlist_title === artlist_data.artlist_title);
            assert(response.body.artlist_description === artlist_data.artlist_description);
            artlist_data._id = null;
        });

        it ("Delete a Artlist with no token (401)", async function () 
        {
            await supertest(app)
                .delete(`/artlist/${artlist_data._id}`)
                .expect(401);
        });

        it ("Delete a Artlist with invalid token (401)", async function () 
        {
            await supertest(app)
                .delete(`/artlist/${artlist_data._id}`)
                .set("Authorization", artist.token)
                .expect(401);
        });

        it ("Delete a Artlist with invalid id (404)", async function () 
        {
            await supertest(app)
                .delete("/artlist/1234")
                .set("Authorization", collector.token)
                .expect(404);
        });
    });

};