const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema");
const audioSchema = require("@entities/auxiliarSchemas/audio.schema");

const artworkSchema = new mongoose.Schema(
  {
    artwork_about: {
      artwork_artist: {
        type: String,
        ref: "Artist",
        required: false,
        default: null,
        autopopulate: true,
      },
      artwork_gallery: {
        type: String,
        ref: "Gallery",
        required: true,
        default: null,
        autopopulate: true,
      },
      artwork_gallery_artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GalleryArtist",
        required: false,
        default: null,
        autopopulate: true,
      },
      artwork_title: {
        type: String,
        required: true,
        index: "text",
      },
      artwork_description: {
        type: String,
        required: true,
      },
      artwork_medium: {
        type: String,
        required: true,
      },
      artwork_year: {
        type: Object,
        required: true,
      },
      artwork_size: {
        type: Object,
        required: true,
      },
      artwork_theme: {
        type: Array,
        required: true,
      },
      artwork_feeling: {
        type: Array,
        required: true,
      },
      artwork_color: {
        type: Array,
        required: true,
      },
      artwork_currency: {
        type: String,
        required: true,
      },
      artwork_price: {
        type: Number,
        required: true,
      },
      artwork_limited_edition: {
        type: Boolean,
        required: true,
      },
      artwork_includes_frame: {
        type: Boolean,
        required: true,
        default: false,
      },
      artwork_includes_certificate: {
        type: Boolean,
        required: true,
        default: false,
      },
      artwork_type: {
        type: String,
        required: true,
        enum: ["Work of Artist", "Gallery owned"],
        default: "Work of Artist",
      },
    },
    artwork_media: {
      artwork_main_picture: {
        type: imageSchema,
        required: true,
      },
      artwork_secondary_pictures: {
        type: [imageSchema],
        required: false,
      },
      artwork_audio: audioSchema,
    },
    artwork_shipping: {
      artwork_shipping_own: {
        type: Object,
        required: true,
      },
      artwork_shipping_rest: {
        type: Object,
        required: true,
      },
      artwork_shipping_exceptions: {
        type: Array,
        required: false,
        default: null,
      },
    },
    artwork_status: {
      type: String,
      required: true,
      enum: ["available", "unavailable", "sold", "original_sold"],
    },
    artwork_flags: {
      type: Object,
      required: false,
      default: {
        price_changes_remaining: 2,
        marked_as_private: false,
        prelaunch_promotion: false,
        hasThoughts: false,
        hasRatings: false,
        automatic_renewal: true,
      },
    },
    artwork_limited_editions: {
      type: Object,
      required: false,
    },
    random: {
      type: Number,
      default: function () {
        return Math.random();
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

artworkSchema.statics.sellArtwork = async function (order, transaction) {
  const artwork = order.order_artwork;
  // If it is a limited edition, we have to update the number of available editions
  if (
    order.order_limited_edition_data &&
    artwork.artwork_about.artwork_limited_edition
  ) {
    artwork.artwork_limited_editions = {
      ...artwork.artwork_limited_editions,
      [order.order_limited_edition_data.size]: {
        ...artwork.artwork_limited_editions[
          order.order_limited_edition_data.size
        ],
        sold:
          artwork.artwork_limited_editions[
            order.order_limited_edition_data.size
          ].sold + 1,
      },
    };
    if (
      artwork.artwork_limited_editions[order.order_limited_edition_data.size]
        .sold ==
      artwork.artwork_limited_editions[order.order_limited_edition_data.size]
        .quantity
    ) {
      artwork.artwork_status =
        artwork.artwork_status == "available" ? "sold" : "original_sold";
    }
  }
  // If it is not a limited edition, we have to mark it as sold or original sold
  else if (artwork.artwork_about.artwork_limited_edition) {
    artwork.artwork_status = "original_sold";
  } else {
    artwork.artwork_status = "sold";
  }

  artwork.artwork_flags = {
    ...artwork.artwork_flags,
    sold_at: Date.now(),
  };

  await artwork.save({ session: transaction.transaction });
};

artworkSchema.statics.generateClaimCode = async function () {
  let claim_code = Math.random().toString(36).substring(2, 8);
  // Ensure that the code is unique
  while (await this.findOne({ "artwork_flags.claim_code": claim_code })) {
    claim_code = Math.random().toString(36).substring(2, 8);
  }
  return claim_code;
};

artworkSchema.methods.limitedEditionAvailable = function (size) {
  if (size) {
    return (
      this.artwork_limited_editions[size].sold <
      this.artwork_limited_editions[size].quantity
    );
  } else {
    return Object.values(this.artwork_limited_editions).some(
      (size) => size.sold < size.quantity
    );
  }
};

const ArtworkLike = require("./artworkLike.modelsub");
const ArtworkSave = require("./artworkSave.modelsub");
const ArtworkVisit = require("./artworkVisit.modelsub");

const tmpModel = mongoose.model("Artwork", artworkSchema);
const Artwork = new KaindaModel(tmpModel);
Artwork.isArtworkAvailable = async function (artwork_id) {
  let val = await tmpModel.findOne({
    artwork_status: "available",
    _id: artwork_id,
  });

  if (val) {
    return true;
  } else {
    return false;
  }
};
Artwork.ArtworkLike = ArtworkLike;
Artwork.ArtworkSave = ArtworkSave;
Artwork.ArtworkVisit = ArtworkVisit;
module.exports = Artwork;
