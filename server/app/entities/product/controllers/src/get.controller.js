const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all products
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllProducts(req, res) 
{
    const Product = ModelsService.Models.Product;
    try 
    {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key]; 
            } 
        });
        const response = await Product.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(product => product.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get product by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getProductById(req, res) 
{
    const Product = ModelsService.Models.Product;
    try 
    {
        const product = await Product.findById(req.params.product_id);
        if (!product) 
        {
            throw new Product.Exceptions.ProductNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.product_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(product.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getCollectionByUserId(req, res)
{
    const Product = ModelsService.Models.Product;
    try 
    {
        const options = {
            offset : req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            },
            sort: {
                "product_metadata.artwork_bought_at": -1,
            },
        };

        const query = {
            product_owner: req.params.user_id,
            "product_metadata.is_private": false
        };

        if(req.query.visibility === "private" && req.token_decoded?.uid === req.params.user_id)
        {
            delete query["product_metadata.is_private"];
        }

        const collection = await Product.subModel.paginate(query, options);

        for(let i = 0; i < collection.data.length; i++)
        {
            collection.data[i] = {
                ...collection.data[i].product_artwork.toJSON(),
                product_owner: collection.data[i].product_owner,
                product_metadata: collection.data[i].product_metadata,
                product_id: collection.data[i]._id
            };
        }

        return res.status(200).json(collection);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getCollectionByUserId
};