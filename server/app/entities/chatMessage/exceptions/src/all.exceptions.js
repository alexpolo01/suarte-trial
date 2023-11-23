const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ChatMessageException : KaindaException,
    ChatMessageBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ChatMessageNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ChatMessageAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ChatMessageNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ChatMessageNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ChatMessageNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ChatMessageExceptionHandler: GenericKaindaExceptionHandler
};