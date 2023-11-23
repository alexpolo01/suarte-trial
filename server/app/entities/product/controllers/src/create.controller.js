const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new product
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createProduct(req, res) 
{
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());
    try 
    {
        const product = await Product.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(product.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createProduct
};