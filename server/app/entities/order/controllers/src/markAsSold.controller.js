const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const SocketService = require("@services/socket.service");

/**
 * Mark an artwork as sold
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function markAsSold(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try
    {
        const artwork = await Artwork.findOne({
            _id: req.params.artwork_id
        });

        if (!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.artwork_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        if (artwork.artwork_limited_editions && !artwork.limitedEditionAvailable())
        {
            artwork.artwork_status = "original_sold";
        }
        else
        {
            artwork.artwork_status = "sold";
        }

        // Generate claim code, 6 digits alphanumeric
        const claim_code = await Artwork.subModel.generateClaimCode();
        artwork.artwork_flags = {
            ...artwork.artwork_flags,
            claim_code: claim_code,
            sold_at: Date.now()
        };

        // TODO: Send email to collector
        SocketService.sendNotificationArtwork(false, "markAsSold", req.token_decoded.uid, artwork._id);
        await artwork.save();
        return res.status(200).json({
            data: artwork.toJSON()
        });
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function claimArtwork(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    const Product = ModelsService.Models.Product;
    try
    {
        // Remove claim code from artwork
        // Create new product and asign it to the token owner
        const artwork = await Artwork.findOne({
            "artwork_flags.claim_code": req.body.claim_code
        });

        if (!artwork)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.body.claim_code + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        const product = await Product.createOne({
            product_owner: req.token_decoded.uid,
            product_artwork: artwork._id,
            product_metadata: {
                is_limited_edition: false,
                is_private: false,
                artwork_bought_at: Date.now()
            }
        });

        artwork.artwork_flags = {
            ...artwork.artwork_flags,
            claim_code: null,
        };

        SocketService.sendNotificationArtwork(false, "claimArtwork", req.token_decoded.uid, artwork._id);
        await artwork.save();

        return res.status(200).json({
            ...artwork.toJSON(),
            product_metadata: {
                ...product.product_metadata,
            },
            product_id: product._id
        });

    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getSoldData(req, res)
{
    const Artwork = ModelsService.Models.Artwork;
    const Product = ModelsService.Models.Product;
    const Order = ModelsService.Models.Order;
    try
    {

        const order = await Order.findOne({ artwork: req.params.artwork_id });

        if (order)
        {
            return res.status(200).json({
                price: order.order_payment.price,
                from: order.order_seller,
                to: (order.order_product?.product_metadata?.is_private) ? null : order.order_buyer,
                date: order.order_product?.product_metadata?.artwork_bought_at ?? order.createdAt
            });
        }

        const product = await Product.findOne({ product_artwork: req.params.artwork_id });

        if (product)
        {
            await product.populate("product_owner");
            return res.status(200).json({
                price: product.product_artwork.artwork_about.artwork_price,
                from: product.product_artwork.artwork_about.artwork_gallery,
                to: product?.product_metadata?.is_private ? null : product.product_owner,
                date: product.product_metadata.artwork_bought_at
            });
        }

        const artwork = await Artwork.findOne({ _id: req.params.artwork_id });

        if (artwork)
        {
            return res.status(200).json({
                price: artwork.artwork_price,
                from: artwork.artwork_about.artwork_gallery,
                to: null,
                date: artwork.createdAt
            });
        }

    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    markAsSold,
    claimArtwork,
    getSoldData
};