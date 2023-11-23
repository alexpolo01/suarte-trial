const supertest = require("supertest");

async function collectorToken() 
{
    const response = await supertest(app)
        .post("/login/idtoken")
        .set("Content-Type", "application/json")
        .auth("Suarte", "@Suarte2021", { type: "basic" })
        .send({
            user_email: "collector@dev.suarte.art",
            user_password: "123456",
        });
    return response.body;
}

async function galleryToken() 
{
    const response = await supertest(app)
        .post("/login/idtoken")
        .set("Content-Type", "application/json")
        .auth("Suarte", "@Suarte2021", { type: "basic" })
        .send({
            user_email: "gallery@dev.suarte.art",
            user_password: "@Suarte2021",
        });
    return response.body;
}

async function artistToken() 
{
    const response = await supertest(app)
        .post("/login/idtoken")
        .set("Content-Type", "application/json")
        .auth("Suarte", "@Suarte2021", { type: "basic" })
        .send({
            user_email: "artist@dev.suarte.art",
            user_password: "123456",
        });
    return response.body;
}

module.exports = {
    collectorToken,
    galleryToken,
    artistToken,
};

