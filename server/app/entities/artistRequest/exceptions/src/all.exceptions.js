const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ArtistRequestException : KaindaException,
    ArtistRequestBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ArtistRequestNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ArtistRequestAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ArtistRequestNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtistRequestNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtistRequestNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ArtistRequestExceptionHandler: GenericKaindaExceptionHandler
};