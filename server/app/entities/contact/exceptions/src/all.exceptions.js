const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ContactException : KaindaException,
    ContactBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ContactNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ContactAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ContactNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ContactNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ContactNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ContactExceptionHandler: GenericKaindaExceptionHandler
};