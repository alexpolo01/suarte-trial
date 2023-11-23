const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        const artlist_data = [
            {
                artlist_title: "Artlist title 1",
                artlist_description: "Artlist description 1"
            },
            {
                artlist_title: "Artlist title 2",
                artlist_description: "Artlist description 2"
            }
        ];

        let collector = null;
        let artist = null;

        before(async function () 
        {
            collector = await collectorToken(app);
            artist = await artistToken(app);

            let response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send(artlist_data[0]);
            artlist_data[0]._id = response.body._id;
            response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send(artlist_data[1]);
            artlist_data[1]._id = response.body._id;
        });

        this.afterAll(async function () 
        {
            await supertest(app)
                .delete(`/artlist/${artlist_data[0]._id}`)
                .set("Authorization", collector.token)
                .expect(200);
            await supertest(app)
                .delete(`/artlist/${artlist_data[1]._id}`)
                .set("Authorization", collector.token)
                .expect(200);
        });
    
        describe("Get all Artlists", function () 
        {

            it("Get all Artlists successfully (200) with data");

            it("Get all Artlists successfully (200) without data");

            it("Get all Artlists with invalid token (401)");

            it("Get all Artlists with no permission (403)");

        });

        describe("Get Artlists by username", function () 
        {

            it("Get Artlists by username successfully (200) with data", async function () 
            {
                const response = await supertest(app)
                    .get(`/artlist/username/${collector.user_session.user_username}`)
                    .expect(200);
                assert(response.body.data.length > 0);
                let artlist_ids = [];
                for (let i = 0; i < response.body.data.length; i++) 
                {
                    artlist_ids.push(response.body.data[i]._id);
                }
                assert(artlist_ids.includes(artlist_data[0]._id));
                assert(artlist_ids.includes(artlist_data[1]._id));
            });

            it("Get Artlists by username successfully (200) without data", async function () 
            {
                const response = await supertest(app)
                    .get(`/artlist/username/${artist.user_session.user_username}`)
                    .expect(200);
                assert(response.body.data.length === 0);
            });

            it("Get Artlists by username with invalid username (404)", async function () 
            {
                await supertest(app)
                    .get("/artlist/username/NonExistentUser/")
                    .expect(404);
            });

        });

        describe("Get Artlist by id", function () 
        {

            it("Get a Artlist successfully (200)", async function () 
            {
                const response = await supertest(app)
                    .get(`/artlist/${artlist_data[0]._id}`)
                    .expect(200);
                assert(response.body._id === artlist_data[0]._id);
            });

            it("Get a Artlist with invalid id (404)", async function () 
            {
                await supertest(app)
                    .get("/artlist/")
                    .expect(404);

                await supertest(app)
                    .get("/artlist/NonExistentId")
                    .expect(404);
            });

        });

    });

};