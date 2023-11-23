const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const EmailService = require("@services/email.service");
const { default: mongoose } = require("mongoose");

/**
 * Automatic renewal modification
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function automaticRenewal(req, res) {
  const Artwork = ModelsService.Models.Artwork;
  try {
    const artwork = await Artwork.findOne({
      _id: req.params.artwork_id,
      "artwork_about.artwork_gallery": req.token_decoded.uid,
    });
    if (!artwork) {
      throw new Artwork.Exceptions.ArtworkNotFoundException({
        error_type: "NOT_FOUND",
        error_message: req.params.artwork_id + " not found",
        error_data: {
          req: req.body,
        },
      });
    }
    artwork.artwork_flags = {
      ...artwork.artwork_flags,
      automatic_renewal: req.body.is_automatic,
    };
    await artwork.save();
    return res.status(200).json(artwork.toJSON());
  } catch (error) {
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

async function withdrawArtwork(req, res) {
  const Artwork = ModelsService.Models.Artwork;
  // const Order = ModelsService.Models.Order;
  // const Product = ModelsService.Models.Product;
  const Rating = ModelsService.Models.Rating;
  const Thought = ModelsService.Models.Thought;
  const ThoughtLike = Thought.ThoughtLike;

  const Artlist = ModelsService.Models.Artlist;
  const ArtlistLike = Artlist.ArtlistLike;
  const artworks_id = req.params.artwork_id;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (await Artwork.isArtworkAvailable(artworks_id)) {
      let updatedArtlistIds = await Artlist.Controller.updateArtworkInArtlist(
        req,
        res
      );
      await ArtlistLike.deleteMany({
        artlist: { $in: updatedArtlistIds.updatedArtlistIds },
      });
      await Artwork.ArtworkSave.unsave(artworks_id, req.token_decoded.uid);
      await Artwork.ArtworkVisit.__deleteArtworkView(artworks_id);
      await Rating.__deleteRatingByArtworkId(artworks_id);
      let deletedThoughtIds = await Thought.__deleteThoughtsByArtworkId(
        artworks_id
      );
      await ThoughtLike.deleteMany({ thought: { $in: deletedThoughtIds } });

      const artwork = await Artwork.findOne({
        _id: req.params.artwork_id,
        "artwork_about.artwork_gallery": req.token_decoded.uid,
      });
      if (!artwork) {
        throw new Artwork.Exceptions.ArtworkNotFoundException({
          error_type: "NOT_FOUND",
          error_message: req.params.artwork_id + " not found",
          error_data: {
            req: req.body,
          },
        });
      }

      EmailService.sendRaw({
        from: "Suarte Automatic Email <withdrawal@suarte.art>",
        to: "pablo@suarte.art",
        subject: "Withdrawal request",
        html:
          "Withdrawal request for artwork " +
          artwork.artwork_about.artwork_title +
          " by " +
          artwork.artwork_about.artwork_artist?.user_name +
          " (" +
          artwork.artwork_about.artwork_gallery.user_name +
          ")",
      });

      artwork.artwork_status = "unavailable";
      await artwork.save();

      return res.status(200).json(artwork.toJSON());
    } else {
      throw new Artwork.Exceptions.ArtworkBadRequestException({
        error_type: "NOT_AVAILABLE",
        error_message: req.params.artwork_id + " is not available",
        error_data: {
          req: req.body,
        },
      });
    }
  } catch (error) {
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

module.exports = {
  automaticRenewal,
  withdrawArtwork,
};
