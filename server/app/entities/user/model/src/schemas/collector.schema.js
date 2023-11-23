const DbService = require("@services/db.service");
const mongoose = DbService.get();

const userAddress = require("@entities/auxiliarSchemas/userAddress.schema");

const collectorSchema = new mongoose.Schema({
    user_collection : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    user_addresses: {
        type: [userAddress],
    },
});

module.exports = collectorSchema;