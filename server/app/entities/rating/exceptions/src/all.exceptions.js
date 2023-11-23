const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    RatingException : KaindaException,
    RatingBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    RatingNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    RatingAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    RatingNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    RatingNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    RatingNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    RatingExceptionHandler: GenericKaindaExceptionHandler
};