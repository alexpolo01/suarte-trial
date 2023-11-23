const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();
const issueSchema = require("./issue.schema");

const orderSchema = new mongoose.Schema(
    {
        order_number: {
            type: String,
            required: true,
            unique: true,
            default: function () 
            {
                const timestamp = Date.now(); // current time as a timestamp (in milliseconds)
                const randomNum = Math.floor(Math.random() * 1000); // random number between 0 and 999
                // concatenate the timestamp with the random number (and zero-pad the random number)
                return `${timestamp}-${String(randomNum).padStart(3, "0")}`;
            },
        },
        order_buyer: {
            type: String,
            required: true,
            ref: "User",
            autopopulate: true,
        },
        order_seller: {
            type: String,
            required: true,
            ref: "User",
            autopopulate: true,
        },
        order_artwork: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Artwork",
            autopopulate: true,
        },
        order_product: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Product",
            autopopulate: true,
        },
        order_status: {
            type: String,
            required: true,
            enum: [
                "payment_pending",
                "pending",
                "sent",
                "cancelled",
                "refunded",
                "completed",
            ],
            default: "payment_pending",
        },
        order_checkout_session: {
            type: Object,
            required: false,
        },
        order_payment: {
            price: Number,
            shipping: Number,
            taxes: Number,
            total: Number,
            currency: String,
        },
        order_payment_events: {
            type: Array,
            required: true,
            default: [],
        },
        order_message: {
            type: String,
            required: false,
        },
        order_limited_edition_data: {
            type: Object,
            required: false,
        },
        order_shipping_address: {
            type: Object,
            required: true,
        },
        order_tracking: {
            type: Object,
            required: false,
        },
        order_issue: {
            type: issueSchema,
            required: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) 
            {
                delete ret.__v;
                delete ret.order_checkout_session;
                delete ret.order_payment_events;
                if (ret.order_issue && ret.order_issue.issue_status === "resolved") 
                {
                    delete ret.order_issue;
                }
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) 
            {
                delete ret.__v;
                delete ret.order_checkout_session;
                delete ret.order_payment_events;
                if (ret.order_issue && ret.order_issue.issue_status === "resolved") 
                {
                    delete ret.order_issue;
                }
            },
        },
    }
);

const tmpModel = mongoose.model("Order", orderSchema);
const Order = new KaindaModel(tmpModel);

Order.__deleteOrderByArtworkId = async function (artworkId) 
{
    await tmpModel.deleteOne({ order_artwork: artworkId });
};
module.exports = Order;
