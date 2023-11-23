const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
  delete: function (app) {
    const Artwork = ModelsService.Models.Artwork;

    // Delete artwork by id
    app.delete(
      "/artwork/:artwork_id/",
      [deactivateRoute, tokenValid, Artwork.Middlewares.canDeleteResource],
      Artwork.Controller.deleteArtwork
    );

    app.delete(
      "/artwork",
      [tokenValid],
      Artwork.Controller.deleteArtworkRelatedThings
    );
    // app.delete(
    //   "/artwork/:artwork_id/",
    //   [tokenValid],
    //   Artwork.Controller.deleteArtworkRelatedThings
    // );
  },
};
