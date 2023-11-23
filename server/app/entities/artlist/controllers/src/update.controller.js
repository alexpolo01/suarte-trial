const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const { ObjectId } = require("mongodb");

/**
 * Update artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateArtlist(req, res) {
  const Artlist = ModelsService.Models.Artlist;
  //   const mongoose = DbService.get();
  try {
    // Obtain artlist
    let artlist = req.artlist;
    if (!artlist) {
      artlist = await Artlist.findOne({ _id: req.params.artlist_id });
      if (!artlist) {
        throw new Artlist.Exceptions.ArtlistNotFoundException({
          error_type: "NOT_FOUND",
          error_message: req.params.artlist_id + " not found",
          error_data: {
            req: req.body,
          },
        });
      }
    }

    // Remove artworks from artlist
    let updateCover = false;
    if (req.body.artworks_remove && req.body.artworks_remove.length > 0) {
      let artworksToRemove = [];

      for (const artwork of req.body.artworks_remove) {
        // Set cover to next artwork if removing cover
        if (
          artlist.artlist_image.image_id ===
          artwork.artwork_media.artwork_main_picture.image_id
        ) {
          updateCover = true;
        }
        artworksToRemove = [
          ...artworksToRemove,
          ...artlist.artlist_artworks.filter((artworkAux) => {
            return artworkAux._id.toString() === artwork._id.toString();
          }),
        ];
      }

      artworksToRemove = artworksToRemove.map((artwork) =>
        artwork._id.toString()
      );

      // Remove artworks from artlist
      artlist.artlist_artworks = artlist.artlist_artworks.filter((artwork) => {
        return !artworksToRemove.includes(artwork._id.toString());
      });

      // TODO: Atomic operations to avoid errors
      // This makes the logic of multiple removes unusable
      // artlist = await Artlist.subModel.findOneAndUpdate({
      //     _id: artlist._id
      // }, {
      //     $pull: {
      //         artlist_artworks: {
      //             _id: artworksToRemove[0]
      //         }
      //     }
      // }, {
      //     new: true,
      //     safe: true
      // });
    }

    // Add artworks to artlist
    if (req.body.artworks_add && req.body.artworks_add.length > 0) {
      let artworksToAdd = [];
      for (const artwork of req.body.artworks_add) {
        const exists =
          artlist.artlist_artworks.filter((artworkAux) => {
            return artworkAux._id.toString() === artwork._id.toString();
          }).length > 0;
        if (!exists) {
          const artworkExists =
            await ModelsService.Models.Artwork.subModel.exists({
              _id: artwork._id,
            });
          if (!artworkExists) {
            throw new Artlist.Exceptions.ArtlistNotFoundException({
              error_type: "NOT_FOUND",
              error_message: artwork.artwork_about.artwork_title + " not found",
              error_data: {
                artwork: artwork,
              },
            });
          }
          artworksToAdd.push(artwork);
        }
      }
      if (artworksToAdd.length > 0) {
        if (artlist.artlist_artworks.length === 0) {
          updateCover = true;
        }
        artlist = await Artlist.subModel.findOneAndUpdate(
          { _id: artlist._id },
          { $push: { artlist_artworks: artworksToAdd } },
          { new: true }
        );
      }
    }

    // Update artlist info
    for (const key in req.body) {
      if (
        key === "artworks_add" ||
        key === "artworks_remove" ||
        !Artlist.updateable_keys.includes(key)
      ) {
        continue;
      }
      artlist[key] = req.body[key];
    }

    // Update cover if needed
    if (updateCover) {
      artlist.artlist_image =
        artlist?.artlist_artworks[0]?.artwork_media?.artwork_main_picture;
    }

    // Remove cover if no artworks
    if (artlist.artlist_artworks.length === 0) {
      artlist.artlist_image = null;
    }

    // Fail if count more than 200
    if (artlist.artlist_artworks.length > 200) {
      throw new Artlist.Exceptions.ArtlistBadRequestException({
        error_type: "MAX_ARTLIST_ARTWORKS",
        error_message: "Artworks count cannot be more than 200",
        error_data: {
          req: req.body,
        },
      });
    }

    // Calculate likes if token
    let is_liked = false;
    if (req.token_decoded?.uid) {
      is_liked =
        (await Artlist.ArtlistLike.subModel.countDocuments({
          artlist: artlist._id,
          user: req.token_decoded.uid,
        })) > 0;
    }

    let artlist_likes = await Artlist.ArtlistLike.subModel.countDocuments({
      artlist: artlist._id,
    });

    await artlist.save();
    return res.status(200).json({
      ...artlist.toJSON(),
      is_liked: is_liked,
      artlist_likes: artlist_likes,
    });
  } catch (error) {
    let customError = error;
    LogService.ErrorLogger.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      customError = new Artlist.Exceptions.ArtlistBadRequestException({
        error_type:
          "INVALID_" +
          error.errors[Object.keys(error.errors)[0]].path.toUpperCase(),
        error_message: error.errors[Object.keys(error.errors)[0]].message,
        error_data: {
          req: req.body,
        },
      });
    }
    ExceptionService.handle(customError, res);
  }
}

/**
 * Update artworks in artlist
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function updateArtworkInArtlist(req, res) {
  const Artlist = ModelsService.Models.Artlist;
  const mongoose = DbService.get();
  const removalArtworksIds = [req.params.artwork_id];
  // req.body.artworks_ids.map((id) => {
  //   return id;
  // });

  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const artlistsToUpdate = await Artlist.findAll({
      artlist_artworks: { $in: removalArtworksIds },
    });
    const artlistIds = artlistsToUpdate.map((artlist) => {
      let newVal = new ObjectId(artlist.id).toHexString();
      return newVal;
    });

    console.log("artlistIds:", artlistIds, "REMOVAL->>>>>", removalArtworksIds);
    let result = await Artlist.updateMany(
      { $pull: { artlist_artworks: { $in: removalArtworksIds } } },
      {},
      { multi: true }
    );

    console.log("update Result:", result);
    await session.commitTransaction();

    return {
      status: "success",
      updatedArtlistIds: artlistIds,
    };
  } catch (err) {
    console.log("Artlist Error:", err);
    await session.abortTransaction();
    LogService.ErrorLogger.error(err, err);
  }
}
module.exports = {
  updateArtlist,
  updateArtworkInArtlist,
};
