const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");

/**
 * Search for artworks
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function searchArtworks(req, res) {
  const Artwork = ModelsService.Models.Artwork;
  try {
    const query = SearchService.parseQuery(req.query);
    query["artwork_status"] = {
      $nin: ["sold", "unavailable"],
    };
    const query2 = {
      "artwork_about.artwork_gallery.user_flags.onboarding_completed": true,
    };
    const artworks = await SearchService.searchArtworks(
      req,
      Artwork,
      query,
      query2
    );
    return res.status(200).json(artworks);
  } catch (error) {
    LogService.ErrorLogger.error(error);
    ExceptionService.handle(error, res);
  }
}

module.exports = {
  searchArtworks,
};
