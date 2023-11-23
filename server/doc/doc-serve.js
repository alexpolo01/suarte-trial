const swaggerUi = require("swagger-ui-express");

/**
 * Serve the documentation
 * @param {Object} app 
 * @param {String} path 
 * @param {String} filePath 
 * @returns {void}
 */
function serveDocumentation(app, path = "/doc", filePath = "./openapi.json") 
{
    // Serve the swagger UI
    const swaggerFile = require(filePath);
    app.use(
        path,
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
                return res.status(401).send("Access denied");
            }

            next();
        },
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile, {
            explorer: false,
            customCss: ".curl-command { display: none } .response-col_links { display: none } .response-control-media-type { display: none } .response-col_request_url { display: none } .response-col_response_headers { display: none } .response-col_status { padding: 25px 5px!important }",
            swaggerOptions: {
                docExpansion: "none",
                filter: true,
                showRequestDuration: true,
                onComplete : () => 
                {
                    // Change the page title
                    // eslint-disable-next-line no-undef
                    document.title = "Suarte Backend Docs";
                }
            },
        })
    );
}

module.exports = serveDocumentation;