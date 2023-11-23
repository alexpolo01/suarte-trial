const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Follow endpoint", function () 
    {

        let collector = null;
        let artist = null;

        before(async function () 
        {
            collector = await collectorToken(app);
            artist = await artistToken(app);
        });

        it("Follow a user successfully (200)", async function () 
        {
            await supertest(app)
                .post("/user/follow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(200);
        });

        it("Follow a user already followed (200)", async function () 
        {
            await supertest(app)
                .post("/user/follow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(200);
        });

        it("Follow a user without a valid token (401)", async function () 
        {
            await supertest(app)
                .post("/user/follow")
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(401);
        });

        it("Follow a user that does not exist (404)", async function () 
        {
            await supertest(app)
                .post("/user/follow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: "5f9d7a7b9d1f9d1f9d1f9d1f",
                })
                .expect(404);
        });

        it("Follow himself (409)", async function () 
        {
            await supertest(app)
                .post("/user/follow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: collector.user_session._id,
                })
                .expect(409);
        });

        it("Unfollow a user successfully (200)", async function () 
        {
            await supertest(app)
                .post("/user/unfollow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(200);
        });

        it("Unfollow a user not followed (200)", async function () 
        {
            await supertest(app)
                .post("/user/unfollow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(200);
        });

        it("Unfollow a user without a valid token (401)", async function () 
        {
            await supertest(app)
                .post("/user/unfollow")
                .send({
                    followee_id: artist.user_session._id,
                })
                .expect(401);
        });

        it("Unfollow a user that does not exist (404)", async function () 
        {
            await supertest(app)
                .post("/user/unfollow")
                .set("Authorization", `Bearer ${collector.token}`)
                .send({
                    followee_id: "5f9d7a7b9d1f9d1f9d1f9d1f",
                })
                .expect(404);
        });

        it("Get followers successfully without a token (200)", async function () 
        {
            await supertest(app)
                .get(`/user/followers/${artist.user_session._id}`)
                .expect(200);
        });

        it("Get followers successfully with a token (200)", async function () 
        {
            await supertest(app)
                .get(`/user/followers/${artist.user_session._id}`)
                .set("Authorization", `Bearer ${collector.token}`)
                .expect(200);
        });

        it("Get followers of a user that does not exist, but returns OK (200)", async function () 
        {
            await supertest(app)
                .get("/user/followers/5f9d7a7b9d1f9d1f9d1f9d1f")
                .expect(200);
        });
            

    });

};