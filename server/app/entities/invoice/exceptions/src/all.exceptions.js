const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    InvoiceException : KaindaException,
    InvoiceBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    InvoiceNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    InvoiceAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    InvoiceNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    InvoiceNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    InvoiceNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    InvoiceExceptionHandler: GenericKaindaExceptionHandler
};