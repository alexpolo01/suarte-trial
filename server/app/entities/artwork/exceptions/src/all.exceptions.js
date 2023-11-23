const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ArtworkException : KaindaException,
    ArtworkBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ArtworkNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ArtworkAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ArtworkNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtworkNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtworkNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ArtworkExceptionHandler: GenericKaindaExceptionHandler
};