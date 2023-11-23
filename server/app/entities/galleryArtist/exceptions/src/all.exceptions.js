const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    GalleryArtistException : KaindaException,
    GalleryArtistBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    GalleryArtistNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    GalleryArtistAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    GalleryArtistNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryArtistNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryArtistNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryArtistExceptionHandler: GenericKaindaExceptionHandler
};