const ExceptionService = require("@services/exception.service");
const SearchService = require("@services/search.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

async function searchBothArtistTypes(req, res) 
{
    const Artist = ModelsService.Models.User.Artist;
    const GalleryArtist = ModelsService.Models.GalleryArtist;
    try 
    {
        let limit = 100;
        let artistsByText = await Artist.findMany({
            $text: {
                $search: req.query.user_name ?? ""
            }
        }, {
            limit
        });
        let regex = new RegExp(req.query.user_name, "i");
        let artistsByRegex = await Artist.findMany({
            user_name: {
                $regex: regex
            },
            _id: {
                $nin: artistsByText.map(artist => artist._id),
            },
        }, {
            limit
        });
        let artists = new Set([...artistsByText, ...artistsByRegex]);
        limit = limit - artists.size;
        if(limit <= 0)
        {
            artists.sort((a, b) => a.user_name.localeCompare(b.user_name));
            return res.status(200).json(artists);
        }
        let gallery_artist_ids = [];
        for(let artist of artists)
        {
            if(artist.gallery_artist)
            {
                gallery_artist_ids.push(artist.gallery_artist);
            }
        }
        let gallery_artistsByText = await GalleryArtist.findMany({
            $text: {
                $search: req.query.user_name ?? ""
            },
            _id: {
                $nin: gallery_artist_ids,
            },
        }, {
            limit
        });
        let gallery_artistsByRegex = await GalleryArtist.findMany({
            artist_name: {
                $regex: regex
            },
            _id: {
                $nin: [...gallery_artistsByText.map(gallery_artist => gallery_artist._id), ...gallery_artist_ids],
            },
        }, {
            limit
        });
        let gallery_artists = new Set([...gallery_artistsByText, ...gallery_artistsByRegex]);
        gallery_artists.forEach(gallery_artist => 
        {
            gallery_artist.user_name = gallery_artist.artist_name;
        });
        let returnable = [...artists, ...gallery_artists];
        returnable.sort((a, b) => a.user_name.localeCompare(b.user_name));
        return res.status(200).json(returnable);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function searchArtists(req, res) 
{
    try 
    {
        const results = await SearchService.searchArtistsInHome(
            req, 
            ModelsService.Models.User.Artist, 
            {
                follow_data: req.token_decoded?.uid
            }
        );
        return res.status(200).json(results);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function searchGalleries(req, res) 
{
    try 
    {
        const results = await SearchService.searchGalleriesInHome(
            req, 
            ModelsService.Models.User.Gallery,
        ); 
        return res.status(200).json(results);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function searchCollectors(req, res) 
{
    try 
    {
        const results = await SearchService.searchCollectorsInHome(
            req, 
            ModelsService.Models.User.Collector, 
            {
                follow_data: req.token_decoded?.uid
            }
        );
        return res.status(200).json(results);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function searchUsersByUsername(req, res)
{
    try
    {
        const results = await SearchService.searchUsersByUsername(
            req,
            ModelsService.Models.User
        );
        return res.status(200).json(results);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    searchBothArtistTypes,
    searchGalleries,
    searchArtists,
    searchCollectors,
    searchUsersByUsername
};