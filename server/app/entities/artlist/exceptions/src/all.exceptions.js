const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ArtlistException : KaindaException,
    ArtlistBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ArtlistNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ArtlistAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ArtlistNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtlistNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ArtlistNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ArtlistExceptionHandler: GenericKaindaExceptionHandler
};