const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const searchTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    search_orders: {
        type: Array,
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("SearchType", searchTypeSchema);
const SearchType = new KaindaModel(tmpModel);
module.exports = SearchType;
