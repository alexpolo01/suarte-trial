const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

async function getArtistsProfile(req, res) 
{
    const User = ModelsService.Models.User;
    const Artist = User.Artist;
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    const Follow = User.Follow;
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const artworks = await Artwork.findMany(
            {
                "artwork_about.artwork_gallery": req.params.gallery_id,
                artwork_status: req.query.status ?? "available",
            },
            {
                sort: { createdAt: -1 },
            }
        );
        let artists = [];
        let promises = artworks.map(async (artwork) => 
        {
            let artist = null;
            let id = null;
            if (artwork.artwork_about.artwork_artist) 
            {
                id = artwork.artwork_about.artwork_artist._id;
                artist = await Artist.subModel.findById(id);
                artist = artist.toJSON();
            }
            else if (artwork.artwork_about.artwork_gallery_artist) 
            {
                id = artwork.artwork_about.artwork_gallery_artist._id.toString();
                artist = await GalleryArtist.findById(id);
                artist = artist.toJSON();
            }
            if (!artist) 
            {
                return;
            }
            let index = artists.findIndex((artist) => artist._id == id);
            if (index === -1) 
            {
                artists.push(artist);
            }
            else 
            {
                artist = artists[index];
            }
            if (!artist.artworks) 
            {
                artist.artworks = [];
                artist.artwork_count = 0;
            }
            artist.artwork_count++;
            if (artist.artworks.length < 10) 
            {
                artist.artworks.push(artwork);
            }
            if (!req.token_decoded?.uid) 
            {
                return;
            }
            if (artist.is_following_me === true || artist.is_following_me === false) 
            {
                return;
            }
            const is_following_me = await Follow.subModel.countDocuments({
                follower: artist._id,
                followee: req.token_decoded.uid,
            });
            const im_following = await Follow.subModel.countDocuments({
                followee: artist._id,
                follower: req.token_decoded.uid,
            });
            artist.is_following_me = is_following_me > 0;
            artist.im_following = im_following > 0;
        });
        await Promise.all(promises);
        artists.sort((a, b) => b.artwork_count - a.artwork_count);
        artists.forEach((artist) => 
        {
            artist.artworks.sort((a, b) => 
            {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
        });
        return res.status(200).json({
            data: artists,
            totalDocs: artists.length,
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getArtistsProfileByUserId(req, res) 
{
    const User = ModelsService.Models.User;
    const Artist = User.Artist;
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    const Follow = User.Follow;
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const artworks = await Artwork.findMany(
            {
                "artwork_about.artwork_gallery": req.params.user_id,
                artwork_status: req.query.status ?? "available",
            },
            {
                sort: { createdAt: -1 },
            }
        );
        let artists = [];
        let promises = artworks.map(async (artwork) => 
        {
            let artist = null;
            let id = null;
            if (artwork.artwork_about.artwork_artist) 
            {
                id = artwork.artwork_about.artwork_artist._id;
                artist = await Artist.subModel.findById(id);
                artist = artist.toJSON();
            }
            else if (artwork.artwork_about.artwork_gallery_artist) 
            {
                id = artwork.artwork_about.artwork_gallery_artist._id.toString();
                artist = await GalleryArtist.findById(id);
                artist = artist.toJSON();
            }
            if (!artist) 
            {
                return;
            }
            let index = artists.findIndex((artist) => artist._id == id);
            if (index === -1) 
            {
                artists.push(artist);
            }
            else 
            {
                artist = artists[index];
            }
            if (!artist.artworks) 
            {
                artist.artworks = [];
                artist.artwork_count = 0;
            }
            artist.artwork_count++;
            if (artist.artworks.length < 10) 
            {
                artist.artworks.push(artwork);
            }
            if (!req.token_decoded?.uid) 
            {
                return;
            }
            if (artist.is_following_me === true || artist.is_following_me === false) 
            {
                return;
            }
            const is_following_me = await Follow.subModel.countDocuments({
                follower: artist._id,
                followee: req.token_decoded.uid,
            });
            const im_following = await Follow.subModel.countDocuments({
                followee: artist._id,
                follower: req.token_decoded.uid,
            });
            artist.is_following_me = is_following_me > 0;
            artist.im_following = im_following > 0;
        });
        await Promise.all(promises);
        artists.sort((a, b) => b.artwork_count - a.artwork_count);
        artists.forEach((artist) => 
        {
            artist.artworks.sort((a, b) => 
            {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
        });
        return {
            data: artists,
            totalDocs: artists.length,
        };
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getArtworksOfArtistInGallery(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    try 
    {
        const options = {
            offset: req.query.offset ?? 0,
            limit: req.query.limit ?? 10,
            customLabels: {
                docs: "data",
            },
            sort: {
                createdAt: -1,
            },
        };
        let artworks = [];
        if (req.query.artist_type === "gallery_artist") 
        {
            artworks = await Artwork.subModel.paginate(
                {
                    "artwork_about.artwork_gallery": req.params.gallery_id,
                    "artwork_about.artwork_gallery_artist": req.params.artist_id,
                    artwork_status: "available",
                },
                options
            );
        }
        else 
        {
            artworks = await Artwork.subModel.paginate(
                {
                    "artwork_about.artwork_gallery": req.params.gallery_id,
                    "artwork_about.artwork_artist": req.params.artist_id,
                    artwork_status: "available",
                },
                options
            );
        }
        return res.status(200).json(artworks);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getArtistsProfile,
    getArtworksOfArtistInGallery,
    getArtistsProfileByUserId,
};
