const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    DraftException : KaindaException,
    DraftBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    DraftNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    DraftAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    DraftNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    DraftNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    DraftNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    DraftExceptionHandler: GenericKaindaExceptionHandler
};