const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "User",
        required: true
    },
    gallery: {
        type: String,
        ref: "Gallery",
        required: false
    },
    valoration: {
        type: String,
        required: true,
        enum: ["positive", "negative", "neutral"]
    },
    comment: {
        type: String,
        required: false
    },
    is_anonymous: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
});

reviewSchema.statics.getGalleryValoration = async function (galleryId = null) 
{
    const reviews = await this.aggregate([
        {
            $match: {
                gallery: galleryId
            },
        },
        {
            $group: {
                _id: "$valoration",
                count: { $sum: 1 },
            },
        },
    ]);

    // initialize the counts
    let result = {
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0,
        average: 0,
    };

    // update the counts based on the aggregation results
    for (const review of reviews)
    {
        result[review._id] = review.count;
        result.total += review.count;
    }

    if (result.total > 0)
    {
        // calculate the average as percentage of positive reviews
        result.average = parseInt(((result.positive + result.neutral) / result.total) * 100);
    }

    return result;
};

const tmpModel = mongoose.model("Review", reviewSchema);
const Review = new KaindaModel(tmpModel);
module.exports = Review;
