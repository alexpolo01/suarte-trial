const DbService = require("@services/db.service");
const ModelsService = require("@services/models.service");
const { GenericKaindaExceptions } = require("kainda");
const { calculateShippingCost } = require("./src/calculateShippingCost");
const { calculateTaxes } = require("./src/calculateTaxes");
const initStripe = require("stripe");
const config = require("config");

class PaymentService 
{
    static stripe = initStripe(config.get("stripe.secret_key"));

    static calculateShippingCost = calculateShippingCost;
    static calculateTaxes = calculateTaxes;

    static async createCheckoutSession(order, item, buyer, currency) 
    {
        const data = {
            line_items: [
                {
                    price_data: {
                        currency: currency ?? item.artwork_about.artwork_currency,
                        product_data: {
                            name: item.artwork_about.artwork_title,
                            description:
                "by " + item.artwork_about.artwork_artist?.user_name ??
                item.artwork_about.artwork_gallery_artist?.artist_name ??
                "Suarte",
                            images: [
                                item.artwork_media.artwork_main_picture.image_url + "/public",
                            ],
                        },
                        unit_amount: parseInt(order.order_payment.price * 100),
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: currency ?? item.artwork_about.artwork_currency,
                        product_data: {
                            name: "Shipping cost",
                            description: "Shipping cost",
                        },
                        unit_amount: parseInt(order.order_payment.shipping * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: config.get("stripe.success_url"),
            cancel_url: config.get("stripe.cancel_url"),
            billing_address_collection: "required",
            customer_email: buyer.user_email,
            client_reference_id: order._id.toString(),
            metadata: {
                order: order._id.toString(),
            },
            payment_intent_data: {
                metadata: {
                    order: order._id.toString(),
                },
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
        };
        if (order.order_payment.taxes > 0) 
        {
            data.line_items.push({
                price_data: {
                    currency: currency ?? item.artwork_about.artwork_currency,
                    product_data: {
                        name: "VAT",
                    },
                    unit_amount: parseInt(order.order_payment.taxes * 100),
                },
                quantity: 1,
            });
        }
        const session = await PaymentService.stripe.checkout.sessions.create(data);
        return session;
    }

    static verifySignature(request) 
    {
        try 
        {
            return PaymentService.stripe.webhooks.constructEvent(
                request.rawBody,
                request.headers["stripe-signature"],
                config.get("stripe.webhook_secret")
            );
        }
        catch (err) 
        {
            return null;
        }
    }

    static async webhook(req, res) 
    {
        const event = PaymentService.verifySignature(req);
        if (!event) 
        {
            throw new GenericKaindaExceptions.Kainda400Exception({
                error_type: "INVALID_SIGNATURE",
                error_message: "Invalid signature for Stripe webhook",
                error_data: req.body,
            });
        }
        console.log(event.type);
        let response = null;
        switch (event.type) 
        {
        case "checkout.session.completed":
            response = await PaymentService.handleCheckoutSessionCompleted(event);
            break;
        case "checkout.session.expired":
            response = await PaymentService.handleCheckoutSessionExpired(event);
            break;
        case "checkout.session.async_payment_succeeded":
        case "payment_intent.succeeded":
            response = await PaymentService.handlePaymentIntentSucceeded(event);
            break;
        case "checkout.session.async_payment_failed":
        case "payment_intent.payment_failed":
            response = await PaymentService.handlePaymentIntentPaymentFailed(event);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
        }
        res.status(200).json(
            response ?? {
                received: true,
            }
        );
    }

    static async handlePaymentIntentSucceeded(event) 
    {
        const Order = ModelsService.Models.Order;
        const Artwork = ModelsService.Models.Artwork;
        const Product = ModelsService.Models.Product;
        const ChatMessage = ModelsService.Models.ChatMessage;
        let transaction = await Order.transaction(DbService.mongoose);
        const session = event.data.object;
        try 
        {
            const order = await Order.subModel.findOneAndUpdate(
                {
                    _id: session.metadata.order ?? session.client_reference_id,
                },
                {
                    $push: {
                        order_payment_events: {
                            type: event.type,
                            data: session,
                        },
                    },
                },
                {
                    new: true,
                }
            );
            if (!order || order?.order_status !== "payment_pending") 
            {
                return;
            }
            order.order_status = "pending";
            await Artwork.subModel.sellArtwork(order, transaction);
            const product = await Product.createOne(
                {
                    product_owner: order.order_buyer._id,
                    product_artwork: order.order_artwork._id,
                    product_metadata: {
                        is_limited_edition: order.order_limited_edition_data ? true : false,
                        is_private: false,
                        artwork_bought_at: Date.now(),
                    },
                },
                {
                    transaction,
                }
            );
            order.order_product = product._id;
            await order.order_artwork.save({ session: transaction.transaction });
            await order.save({ session: transaction.transaction });
            if (order.order_message && !order.order_limited_edition_data) 
            {
                await ChatMessage.createOne(
                    {
                        message_sender: order.order_buyer._id,
                        message_text: order.order_message,
                        order: order._id,
                    },
                    {
                        transaction,
                    }
                );
            }
            await transaction.commit();
        }
        catch (err) 
        {
            await transaction.rollback();
            throw err;
        }
    }

    static async handleCheckoutSessionCompleted(event) 
    {
        console.log("Handle Checkout Session Completed: ", event);
        return;
    }

    static async handleCheckoutSessionExpired(event) 
    {
        console.log("Handle Cehckout Session Expired: ", event);
        return;
    }

    static async handlePaymentIntentPaymentFailed(event) 
    {
        console.log("Handle Payment Intent Payment Failed: ", event);
        return;
    }
}

module.exports = PaymentService;
