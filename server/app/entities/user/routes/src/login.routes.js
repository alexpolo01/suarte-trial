const ModelsService = require("@services/models.service");
module.exports = {

    loginCustom: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/login/custom",
            [
                (req, res, next) => 
                {
                    User.Middlewares.checkRequiredKeys(req, res, next, ["user_email", "user_password"]);
                }
            ],
            User.Controller.logInPassword
        );
    },

    loginWithGoogle: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/login/google",
            [
            ],
            User.Controller.logInGoogle
        );

    },

    loginWithOnlyId: function (app) 
    {

        const User = ModelsService.Models.User;

        app.post(
            "/login/idtoken",
            [
                (req, res, next) => 
                {
                    // HTTP Basic Authentication function
                    const authHeader = req.headers.authorization;
                    const AUTH_USER = "Suarte";
                    const AUTH_PASS = "@Suarte2021";

                    if (!authHeader) 
                    {
                        res.setHeader("WWW-Authenticate", "Basic realm=\"Restricted Area\"");
                        return res.status(401).send("Access denied");
                    }

                    const encodedCredentials = authHeader.split(" ")[1] ?? "";
                    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString();
                    const [username, password] = decodedCredentials.split(":");

                    if (username !== AUTH_USER || password !== AUTH_PASS) 
                    {
                        res.setHeader("WWW-Authenticate", "Basic realm=\"Restricted Area\"");
                        return res.status(401).send("Access denied2");
                    }

                    next();
                }
            ],
            User.Controller.logInIdToken
        );

    },

};