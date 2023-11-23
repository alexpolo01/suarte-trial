const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    PostException : KaindaException,
    PostBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    PostNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    PostAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    PostNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    PostNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    PostNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    PostExceptionHandler: GenericKaindaExceptionHandler
};