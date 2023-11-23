const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Like endpoint", async function () 
    {

        const artlist_data = {
            artlist_title: "Artlist title",
            artlist_description: "Artlist description",
        };

        let collector = null;

        before(async function () 
        {
            collector = await collectorToken(app);

            const response = await supertest(app)
                .post("/artlist")
                .set("Authorization", collector.token)
                .send({
                    artlist_title: artlist_data.artlist_title,
                    artlist_description: artlist_data.artlist_description,
                })
                .expect(201);
            artlist_data._id = response.body._id;
        });

        this.afterAll(async function () 
        {
            await supertest(app)
                .delete("/artlist/" + artlist_data._id)
                .set("Authorization", collector.token)
                .expect(200);
        });

        it("Like an artlist successfully (200)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist/like")
                .set("Authorization", collector.token)
                .send({
                    artlist_id: artlist_data._id,
                })
                .expect(200);
            assert.strictEqual(response.body.artlist, artlist_data._id);
            assert.strictEqual(response.body.user, collector.user_session._id);
        });

        it("Unlike an artlist successfully (200)", async function () 
        {
            const response = await supertest(app)
                .post("/artlist/unlike")
                .set("Authorization", collector.token)
                .send({
                    artlist_id: artlist_data._id,
                })
                .expect(200);
            assert.strictEqual(response.body.artlist, artlist_data._id);
            assert.strictEqual(response.body.user, collector.user_session._id);
        });

        it("Like an artlist with an invalid token (401)", async function () 
        {
            await supertest(app)
                .post("/artlist/like")
                .send({
                    artlist_id: artlist_data._id,
                })
                .expect(401);
        });

        it("Unlike an artlist with an invalid token (401)", async function () 
        {
            await supertest(app)
                .post("/artlist/unlike")
                .send({
                    artlist_id: artlist_data._id,
                })
                .expect(401);
        });

        it("Like an artlist with an invalid artlist_id (404)", async function () 
        {
            await supertest(app)
                .post("/artlist/like")
                .set("Authorization", collector.token)
                .send({
                    artlist_id: "invalid_id",
                })
                .expect(404);
        });

        it("Unlike an artlist with an invalid artlist_id (404)", async function () 
        {
            await supertest(app)
                .post("/artlist/unlike")
                .set("Authorization", collector.token)
                .send({
                    artlist_id: "invalid_id",
                })
                .expect(404);
        });

    });

};