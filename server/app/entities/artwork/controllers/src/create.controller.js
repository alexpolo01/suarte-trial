const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new artwork
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createArtwork(req, res) 
{
    const Artwork = ModelsService.Models.Artwork;
    let transaction = await Artwork.transaction(DbService.get());
    try 
    {
        req.body.user_id = req.token_decoded.uid;
        const artwork = await Artwork.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(artwork.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createArtwork
};