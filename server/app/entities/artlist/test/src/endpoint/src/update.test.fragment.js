const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Update endpoint", function () 
    {

        const artlist_data = {
            artlist_title: "Artlist title",
            artlist_description: "Artlist description from update test",
            artlist_image: "5f9b2b3b9b3b9b3b9b3b9b3b",
            artlist_artworks: [
                "5f9b2b3b9b3b9b3b9b3b9b3b",
            ],
        };

        let collector = null;
        let artist = null;

        before(async function () 
        {
            collector = await collectorToken(app);
            artist = await artistToken(app);

            let response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send(artlist_data);
            artlist_data._id = response.body._id;
        });

        this.afterAll(async function () 
        {
            await supertest(app)
                .delete(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .expect(200);
        });

        it("Update a Artlist successfully (200)", async function () 
        {
            const response = await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artlist_title: "Artlist title updated",
                })
                .expect(200);
            assert.strictEqual(response.body.artlist_title, "Artlist title updated");
        });

        it("Update a Artlist changing the artworks (200)", async function () 
        {
            const response = await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artlist_artworks: [
                        "64257ad4f2ccd188b19abeb9",
                        "64257ad4f2ccd188b19abeb8",
                        "64257ad4f2ccd188b19abeb7",
                    ],
                })
                .expect(200);
            assert.strictEqual(response.body.artlist_artworks.length, 3);
        });

        it("Update a Artlist adding a new valid artwork (200)", async function () 
        {
            const response = await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artworks_add: [
                        "64257ad4f2ccd188b19abeb6",
                    ],
                })
                .expect(200);
            assert.strictEqual(response.body.artlist_artworks.length, 4);
        });

        it("Update a Artlist adding a new invalid artwork (404)", async function () 
        {
            await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artworks_add: [
                        "5f0b2b3b9b3b9b3b9b3b9b3b", // Different from the one in the seed
                    ],
                })
                .expect(404);
        });

        it("Update a Artlist removing an artwork (200)", async function () 
        {
            const response = await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artworks_remove: [
                        "64257ad4f2ccd188b19abeb6",
                    ],
                })
                .expect(200);
            assert.strictEqual(response.body.artlist_artworks.length, 3);
        });

        it("Update a Artlist with invalid data (400)", async function () 
        {
            await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artlist_title: "",
                })
                .expect(400);

            await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", collector.token)
                .send({
                    artlist_title: "S".repeat(256),
                })
                .expect(400);
        });

        it("Update a Artlist with invalid token (401)", async function () 
        {
            await supertest(app)
                .put(`/artlist/${artlist_data._id}`)
                .set("Authorization", artist.token)
                .send({
                    artlist_title: "Artlist title that should not be updated",
                })
                .expect(401);
        });

        it("Update a Artlist with invalid id (404)", async function () 
        {
            await supertest(app)
                .put("/artlist/5f9b2b3b9b3b9b3b9b3b9b3b")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: "Artlist title that should not be updated",
                })
                .expect(404);

            await supertest(app)
                .put("/artlist/invalid_id")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: "Artlist title that should not be updated",
                })
                .expect(404);
        });
    });

};