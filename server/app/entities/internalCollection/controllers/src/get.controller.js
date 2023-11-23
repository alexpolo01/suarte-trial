const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all internalcollections
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllInternalCollections(req, res) {
  const InternalCollection = ModelsService.Models.InternalCollection;
  const is_mobile = req.params.is_mobile == "true";
  try {
    const filterableKeys = [];
    const filterQuery = {};
    filterableKeys.forEach((key) => {
      if (req.query[key]) {
        filterQuery[key] = req.query[key];
      }
    });
    const response = await InternalCollection.findMany(
      filterQuery,
      {
        ...req.query,
        sort: is_mobile ? { order_mobile: 1, createdAt: 1 } : { order: 1, createdAt: 1 }
      }
    );
    let carousels = response.map((internalcollection) =>
      internalcollection.toJSON()
    );

    return res.status(200).json({
      data: carousels
    });
  } catch (error) {
    console.log(error);
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

/**
 * Get internalcollection by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getInternalCollectionById(req, res) {
  const InternalCollection = ModelsService.Models.InternalCollection;
  try {
    const internalcollection = await InternalCollection.findById(
      req.params.internalcollection_id
    );
    if (!internalcollection) {
      throw new InternalCollection.Exceptions.InternalCollectionNotFoundException(
        {
          error_type: "NOT_FOUND",
          error_message: req.params.internalcollection_id + " not found",
          error_data: {
            req: req.body,
          },
        }
      );
    }
    return res.status(200).json(internalcollection.toJSON());
  } catch (error) {
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

async function getArtworksPaginatedByName(req, res) {
  const InternalCollection = ModelsService.Models.InternalCollection;
  const Artwork = ModelsService.Models.Artwork;
  try {
    const query = {};
    query["artwork_status"] = {
      $nin: ["sold", "unavailable"],
    };
    const name = req.params.collection_id;
    if (name === "limited_editions") {
      const artworks = await SearchService.searchArtworks(req, Artwork, {
        $and: [
          { artwork_limited_editions: { $exists: true } },
          { artwork_limited_editions: { $ne: null } },
        ],
      });
      return res.status(200).json(artworks);
    }
    const collection = await InternalCollection.findOne({
      collection_id: name,
    });
    if (!collection) {
      throw new InternalCollection.Exceptions.InternalCollectionNotFoundException(
        {
          error_type: "NOT_FOUND",
          error_message: name + " not found",
          error_data: {
            req: req.body,
          },
        }
      );
    }
    const artworks = await SearchService.searchArtworksInsideCategory(
      req,
      Artwork,
      collection,
      query
    );
    return res.status(200).json(artworks);
  } catch (error) {
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

module.exports = {
  getAllInternalCollections,
  getInternalCollectionById,
  getArtworksPaginatedByName,
};
