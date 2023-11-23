const DbService = require("@services/db.service");
const { KaindaModel } = require("kainda");
const mongoose = DbService.get();

const productSchema = new mongoose.Schema(
    {
        product_owner: {
            type: String,
            ref: "User",
            required: true,
        },
        product_artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            required: true,
            autopopulate: true,
        },
        product_metadata: {
            type: Object,
            required: false,
            default: {
                is_limited_edition: false,
                is_private: false,
                artwork_bought_at: Date.now(),
            },
        },
    },
    {}
);

module.exports = productSchema;

const tmpModel = mongoose.model("Product", productSchema);
const Product = new KaindaModel(tmpModel);

Product.__deleteProductByArtworkId = async function (artworkId) 
{
    await tmpModel.deleteOne({ product_artwork: artworkId });
};
module.exports = Product;
