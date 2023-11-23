const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Create endpoint", async function () 
    {

        const artlist_data = {
            artlist_title: "Artlist title",
            artlist_description: "Artlist description from create test",
            artlist_image: "64199afbaa70838bccbad996",
            artlist_artworks: [
                "5f9b2b3b9b3b9b3b9b3b9b3b",
            ],
        };

        let collector = null;

        before(async function () 
        {
            collector = await collectorToken(app);
        });

        this.afterEach(async function () 
        {
            if (artlist_data._id) 
            {
                await supertest(app)
                    .delete(`/artlist/${artlist_data._id}`)
                    .set("Authorization", collector.token);
            }
        });

        it("Create a Artlist successfully with only title (201)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: artlist_data.artlist_title,
                })
                .expect(201);
            assert(response.body._id);
            assert(response.body.artlist_title === artlist_data.artlist_title);
            artlist_data._id = response.body._id;
        });

        it("Create a Artlist successfully with title and description (201)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: artlist_data.artlist_title,
                    artlist_description: artlist_data.artlist_description,
                })
                .expect(201);
            assert(response.body._id);
            assert(response.body.artlist_title === artlist_data.artlist_title);
            assert(response.body.artlist_description === artlist_data.artlist_description);
            artlist_data._id = response.body._id;

        });

        it("Create a Artlist successfully with image and artworks (201)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: artlist_data.artlist_title,
                    artlist_image: artlist_data.artlist_image,
                    artlist_artworks: artlist_data.artlist_artworks,
                })
                .expect(201);
            assert(response.body._id);
            assert(response.body.artlist_title === artlist_data.artlist_title);
            assert(response.body.artlist_image?._id === artlist_data.artlist_image);
            assert(response.body.artlist_artworks.length === artlist_data.artlist_artworks.length);
            artlist_data._id = response.body._id;
        });

        it("Create a Artlist with title lenght higher than 48 (400)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    ...artlist_data,
                    artlist_title: "P".repeat(50),
                })
                .expect(400);
            assert(response.body.error_type === "ARTLIST_TITLE_LENGTH");
        });

        it("Create a Artlist without title (400)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    ...artlist_data,
                    artlist_title: null,
                })
                .expect(400);
            assert(response.body.error_type === "EMPTY_FIELD");
        });

        it("Create a Artlist with description lenght higher than 256 (400)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    ...artlist_data,
                    artlist_description: "P".repeat(258),
                })
                .expect(400);
            assert(response.body.error_type === "ARTLIST_DESCRIPTION_LENGTH");
        });

        it("Create a Artlist without token (401)", async function () 
        {
            await supertest(app)
                .post("/artlist")
                .send(artlist_data)
                .expect(401);
        });

    });

};