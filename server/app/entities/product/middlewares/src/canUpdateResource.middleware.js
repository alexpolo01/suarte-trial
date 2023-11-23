const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const { GenericKaindaExceptions } = require("kainda");

/**
 * Check if the user that makes the request can update the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canUpdateResource(req, res, next) 
{

    const Product = ModelsService.Models.Product;
    try 
    {
        const product = await Product.findOne({
            product_owner: req.token_decoded.uid,
            _id: req.params.product_id
        });
    
        if (!product)
        {
            throw GenericKaindaExceptions.Kainda403Exception.fromTemplate();
        }
        next();
    } 
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = canUpdateResource;

