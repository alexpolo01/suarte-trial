const DbService = require("@services/db.service");
const mongoose = DbService.get();

const coordinatesSchema = require("./coordinates.schema");

const addressSchema = new mongoose.Schema({
    continent: String,
    country: String,
    metro: String,
    region: String,
    city: String,
    zip: String,
    street: String,
    timezone: String,
    location : coordinatesSchema,
});

module.exports = addressSchema;
