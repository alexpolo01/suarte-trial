const PaymentService = require("@services/payment.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const SocketService = require("@services/socket.service");

/**
 * Before new payment
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function beforePayment(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    const Review = ModelsService.Models.Review;
    const User = ModelsService.Models.User;
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

        const user = await User.findOne({
            _id: req.token_decoded.uid
        });

        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.token_decoded.uid + " not found",
                error_data: {
                    req: req.body
                }
            });
        }

        let valorations = {};
        if(req.query.type === "limited_edition")
        {
            valorations = await Review.subModel.getGalleryValoration();
        }
        else 
        {
            valorations = await Review.subModel.getGalleryValoration(artwork.artwork_about.artwork_gallery._id);
        }

        return res.status(200).json({
            valorations: valorations,
            user_addresses: user.user_addresses
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Create new payment
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createPayment(req, res) 
{
    const Order = ModelsService.Models.Order;
    const Artwork = ModelsService.Models.Artwork;
    const User = ModelsService.Models.User;
    let transaction = await Order.transaction(DbService.get());
    try 
    {
        const isLimitedEdition = req.body.limited_edition_size;
        const user = await User.findOne({
            _id: req.token_decoded.uid
        });

        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.token_decoded.uid + " not found",
                error_data: {
                    req: req.body,
                    element: "purchase_error"
                }
            });
        }

        const item = await Artwork.findOne({
            _id: req.body.artwork_id
        });

        if (!item)
        {
            throw new Artwork.Exceptions.ArtworkNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Artwork not found",
                error_data: {
                    req: req.body,
                    element: "purchase_error"
                }
            });
        }

        // Si es una edición limitada, comprobar que quedan unidades
        if (isLimitedEdition)
        {
            if (!item.limitedEditionAvailable(isLimitedEdition.size))
            {
                throw new Artwork.Exceptions.ArtworkBadRequestException({
                    error_type: "BUY_NOT_AVAILABLE",
                    error_message: "Size not available",
                    error_data: {
                        req: req.body,
                        element: "purchase_error"
                    }
                });
            }
        }
        // Si no es una edición limitada, comprobar que el status es available
        else if (item.artwork_status !== "available")
        {
            throw new Artwork.Exceptions.ArtworkBadRequestException({
                error_type: "BUY_NOT_AVAILABLE",
                error_message: "Artwork not available",
                error_data: {
                    req: req.body,
                    element: "purchase_error"
                }
            });
        }

        // Si no es una edición limitada, comprobar que no está reservada
        if (!isLimitedEdition && item.artwork_flags.reserved)
        {
            const reservedDate = new Date(item.artwork_flags.reserved).getTime();
            const now = new Date().getTime();
            const diff = Math.abs(reservedDate - now);
            if (diff < 1000 * 60 * 5) // 5 min
            {
                throw new Artwork.Exceptions.ArtworkBadRequestException({
                    error_type: "RESERVED",
                    error_message: "Artwork reserved",
                    error_data: {
                        req: req.body,
                        element: "purchase_error"
                    }
                });
            }
            item.artwork_flags.reserved = null;
        }

        const shipping_address = req.body.shipping_details;
        // Si no es una edición limitada, se pone el precio de la obra
        let price = item.artwork_about.artwork_price;
        let currency = isLimitedEdition ? "EUR" : item.artwork_about.artwork_currency;
        let shipping = 0;
        if (isLimitedEdition) 
        {
            price = item.artwork_limited_editions[isLimitedEdition.size].price;
            if(isLimitedEdition.size === "small")
            {
                shipping = 12;
            }
            else 
            {
                shipping = 18;
            }
            item.artwork_about.artwork_title = item.artwork_about.artwork_title + " - Limited Edition";
        }
        else 
        {
            shipping = PaymentService.calculateShippingCost(item, shipping_address.address_country);
        }

        const taxes = PaymentService.calculateTaxes({
            price: price,
            buyer_country: shipping_address.address_country,
            seller_country: isLimitedEdition ? "Spain" : item.artwork_about.artwork_gallery.gallery_address.country,
        });

        if (!isLimitedEdition)
        {
            item.artwork_flags = {
                ...item.artwork_flags,
                reserved: new Date().getTime()
            };
            await item.save({ session: transaction.transaction });
        }

        const order = await Order.createOne({
            order_buyer: user._id,
            order_seller: item.artwork_about.artwork_gallery,
            order_artwork: item._id,
            order_payment: {
                price: price,
                shipping: shipping,
                taxes: taxes,
                total: price + shipping + taxes,
                currency: currency
            },
            order_limited_edition_data: req.body.limited_edition_size,
            order_shipping_address: shipping_address,
            order_message: req.body.personalized_message,
        }, { transaction });

        const session = await PaymentService.createCheckoutSession(order, item, user, currency);
        order.order_checkout_session = session;
        await order.save({ session: transaction.transaction });
        await transaction.commit();

        if (isLimitedEdition) {
            // SocketService.sendNotification("LimitedEditionSold", req.token_decoded.uid, order.artwork);
        }

        return res.status(200).json(session.url);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        await transaction.rollback();
        ExceptionService.handle(error, res);
    }
}

async function webhookPayment(req, res) 
{
    try 
    {
        await PaymentService.webhook(req, res);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    beforePayment,
    createPayment,
    webhookPayment
};