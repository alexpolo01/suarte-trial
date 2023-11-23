const EmailList = require("@entities/stats/emailList/model");

EmailList.Controller = require("@entities/stats/emailList/controllers");
EmailList.Routes = require("@entities/stats/emailList/routes");

/**
 * VARIABLES
*/
EmailList.create_required_keys = [
    "email",
];

module.exports = EmailList;