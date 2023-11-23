const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    OrderException : KaindaException,
    OrderBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    OrderNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    OrderAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    OrderNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    OrderNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    OrderNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    OrderExceptionHandler: GenericKaindaExceptionHandler
};