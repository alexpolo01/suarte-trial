const { exportFiles } = require("kainda");

const AuthService = exportFiles(__dirname + "/src/", ".js");
module.exports = AuthService;