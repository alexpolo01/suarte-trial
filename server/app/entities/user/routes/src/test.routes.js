const ModelsService = require("@services/models.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");
const LogService = require("@services/log.service");

module.exports = {

    changePassword: function (app) 
    {

        app.post(
            "/test/script",
            async (req, res) => 
            {
                const User = ModelsService.Models.User;
                const Gallery = User.Gallery;
                const Artwork = ModelsService.Models.Artwork;
                let transaction = await Artwork.transaction(DbService.mongoose);
                try 
                {
                    // Get all the galleries with 3 or more artworks
                    const galleries = await Gallery.findMany();
                    // Get the number of artworks in each gallery
                    const promises = await Promise.all(galleries.map(async (gallery) =>
                    {
                        const artworks = await Artwork.subModel.countDocuments({
                            "artwork_about.artwork_gallery": gallery._id,
                        });
                        gallery.artwork_count = artworks;
                        return gallery;
                    }));
                    // Filter the galleries with 3 or more artworks
                    const filtered = promises.filter((gallery) => gallery.artwork_count >= 3);
                    // Get the ids of the galleries with 3 or more artworks
                    await Promise.all(filtered.map(async (gallery) => 
                    {
                        gallery.user_flags = {
                            ...gallery.user_flags,
                            onboarding_completed: true,
                        };
                        await gallery.save({ session: transaction.transaction });
                        const artworks = await Artwork.findMany({
                            "artwork_about.artwork_gallery": gallery._id,
                        });
                        await Promise.all(artworks.map(async (artwork) =>
                        {
                            artwork.artwork_status = "available";
                            await artwork.save({ session: transaction.transaction });
                        }));
                    }));
                    await transaction.commit();
                    res.status(200).json({});
                }
                catch (error)
                {
                    LogService.ErrorLogger.error(error);
                    await transaction.rollback();
                    ExceptionService.handle(error, res);
                }
            }
        );
    },

};