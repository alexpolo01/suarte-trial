const DbService = require("@services/db.service");
const mongoose = DbService.get();

const userAddress = new mongoose.Schema({
    address_name : String,
    address_surname : String,
    address_phone: {
        type: Object,
        address_phone_prefix: String,
        address_phone_number: String,
    },
    address_street: String,
    address_city: String,
    address_zip_code: String,
    address_region: String,
    address_country: String,
});

module.exports = userAddress;
