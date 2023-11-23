const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    GalleryRequestException : KaindaException,
    GalleryRequestBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    GalleryRequestNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    GalleryRequestAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    GalleryRequestNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryRequestNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryRequestNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    GalleryRequestExceptionHandler: GenericKaindaExceptionHandler
};