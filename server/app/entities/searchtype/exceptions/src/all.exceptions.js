const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    SearchTypeException : KaindaException,
    SearchTypeBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    SearchTypeNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    SearchTypeAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    SearchTypeNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    SearchTypeNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    SearchTypeNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    SearchTypeExceptionHandler: GenericKaindaExceptionHandler
};