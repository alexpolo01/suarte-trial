const DbService = require("@services/db.service");
const mongoose = DbService.get();

const adminSchema = new mongoose.Schema({

});

module.exports = adminSchema;