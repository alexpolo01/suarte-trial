const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ReviewException : KaindaException,
    ReviewBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ReviewNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ReviewAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ReviewNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ReviewNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ReviewNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ReviewExceptionHandler: GenericKaindaExceptionHandler
};