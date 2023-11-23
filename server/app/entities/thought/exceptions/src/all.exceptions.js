const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ThoughtException : KaindaException,
    ThoughtBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ThoughtNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ThoughtAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ThoughtNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ThoughtNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ThoughtNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ThoughtExceptionHandler: GenericKaindaExceptionHandler
};