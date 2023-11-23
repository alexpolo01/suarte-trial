const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

async function searchGalleryArtists(req, res) 
{
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        let artistsByText = await GalleryArtist.findMany({
            $text: {
                $search: req.query.user_name
            }
        });
        let regex = new RegExp(req.query.user_name, "i");
        let artistsByRegex = await GalleryArtist.findMany({
            artist_name: {
                $regex: regex
            },
            _id: {
                $nin: artistsByText.map(artist => artist._id),
            },
        });
        return res.status(200).json([...artistsByText, ...artistsByRegex]);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    searchGalleryArtists
};

