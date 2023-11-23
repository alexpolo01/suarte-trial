const {
    searchArtworksInsideCategory,
} = require("./src/searchArtworksInsideCategory");
const { searchUsersByUsername } = require("./src/searchUsername");
const { searchArtistsInHome } = require("./src/searchArtists");
const { searchInspiring } = require("./src/searchInspiring");
const { searchFollowing } = require("./src/searchFollowing");
const { searchGalleriesInHome } = require("./src/searchGalleries");
const { searchCollectorsInHome } = require("./src/searchCollectors");
const { searchArtlists } = require("./src/searchArtlists");
const { searchArtworks } = require("./src/searchArtworks");
const { suarteWorld } = require("./src/suarteWorld");
const { parseQuery } = require("./src/parseQuery");

class SearchService 
{
    static searchArtworksInsideCategory = searchArtworksInsideCategory;
    static searchUsersByUsername = searchUsersByUsername;
    static searchArtistsInHome = searchArtistsInHome;
    static searchGalleriesInHome = searchGalleriesInHome;
    static searchCollectorsInHome = searchCollectorsInHome;
    static searchInspiring = searchInspiring;
    static searchFollowing = searchFollowing;
    static searchArtlists = searchArtlists;
    static searchArtworks = searchArtworks;
    static suarteWorld = suarteWorld;
    static parseQuery = parseQuery;
}

module.exports = SearchService;
