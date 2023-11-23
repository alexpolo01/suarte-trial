const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    InternalCollectionException : KaindaException,
    InternalCollectionBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    CollectionArtworkAlreadyExistsException : GenericKaindaExceptions.Kainda400Exception,
    InternalCollectionNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    InternalCollectionAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    InternalCollectionNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    InternalCollectionNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    InternalCollectionNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    InternalCollectionExceptionHandler: GenericKaindaExceptionHandler
};