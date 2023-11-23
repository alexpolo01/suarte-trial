const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Update product
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateProduct(req, res) 
{
    const Product = ModelsService.Models.Product;
    try 
    {
        req.body = {
            _id : req.params.product_id,
            product_metadata : req.body.product_metadata
        };
        const product = await Product.Controller.__updateProduct(req.body);
        return res.status(200).json(product.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateProduct
};