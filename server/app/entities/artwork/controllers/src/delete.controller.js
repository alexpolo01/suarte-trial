const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const mongoose = require("mongoose");

/**
 * Delete artwork by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteArtwork(req, res) {
  const Artwork = ModelsService.Models.Artwork;
  let transaction = await Artwork.transaction(DbService.get());
  try {
    const artwork = await Artwork.Controller.__deleteArtwork(
      req.params.artwork_id ?? req.body.artwork_id,
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json(artwork.toJSON());
  } catch (error) {
    LogService.ErrorLogger.error(error);
    if (transaction) {
      await transaction.rollback();
    }
    ExceptionService.handle(error, res);
  }
}

/**
 * Delete artwork and related things
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function deleteArtworkRelatedThings(req, res) {
  const Artwork = ModelsService.Models.Artwork;
  // const Order = ModelsService.Models.Order;
  // const Product = ModelsService.Models.Product;
  const Rating = ModelsService.Models.Rating;
  const Thought = ModelsService.Models.Thought;
  const ThoughtLike = Thought.ThoughtLike;

  const Artlist = ModelsService.Models.Artlist;
  const ArtlistLike = Artlist.ArtlistLike;
  // const artworks_id = req.params.artwork_id;
  const artworks_ids = req.body.artworks_ids;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    artworks_ids.forEach(async (artworks_id) => {
      if (await Artwork.isArtworkAvailable(artworks_id)) {
        // await Artwork.ArtworkLike.unlike(artworks_id, req.token_decoded.uid);
        let updatedArtlistIds = await Artlist.Controller.updateArtworkInArtlist(
          req,
          res
        );
        console.log("updatedArtlistIds:", updatedArtlistIds);
        await ArtlistLike.deleteMany({
          artlist: { $in: updatedArtlistIds.updatedArtlistIds },
        });
        await Artwork.Controller.__deleteArtwork(artworks_id);
        await Artwork.ArtworkSave.unsave(artworks_id, req.token_decoded.uid);
        await Artwork.ArtworkVisit.__deleteArtworkView(artworks_id);
        // await Product.__deleteProductByArtworkId(artworks_id);
        await Rating.__deleteRatingByArtworkId(artworks_id);
        let deletedThoughtIds = await Thought.__deleteThoughtsByArtworkId(
          artworks_id
        );
        await ThoughtLike.deleteMany({ thought: { $in: deletedThoughtIds } });
        return res.status(200).json({ status: "success" });
      }
    });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    LogService.ErrorLogger.error(err);
    return res.status(404).json({ error: err });
  }
}
module.exports = {
  deleteArtwork,
  deleteArtworkRelatedThings,
};
