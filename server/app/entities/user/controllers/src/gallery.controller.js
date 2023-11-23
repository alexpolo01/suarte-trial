const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Add new shipping data to gallery
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function changeShipping(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const gallery = await User.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        const shipping = req.body.gallery_shippings;
        gallery.gallery_shippings = shipping;
        await gallery.save();
        return res.status(200).json({ message: "Shipping added successfully", gallery: gallery.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get bank data
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getBankData(req, res) 
{
    const User = ModelsService.Models.User;
    const Gallery = User.Gallery;
    try 
    {
        const gallery = await Gallery.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        return res.status(200).json(gallery.gallery_bank_data ?? {
            bank_name: "",
            swift_code : "",
            account_holder_name : "",
            iban : "",
            one_stop_shop : false,
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Change bank data
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function changeBankData(req, res) 
{
    const User = ModelsService.Models.User;
    const Gallery = User.Gallery;
    try 
    {
        !Gallery.subModel.validateBankData(req.body);
        const gallery = await Gallery.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        gallery.gallery_bank_data = req.body;
        await gallery.save();
        return res.status(200).json(gallery.gallery_bank_data ?? req.body);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get agent data
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getGalleryInfo(req, res) 
{
    const User = ModelsService.Models.User;
    const Gallery = User.Gallery;
    try 
    {
        const gallery = await Gallery.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        return res.status(200).json({
            gallery_agent: gallery.gallery_agent,
            gallery_business_id: gallery.gallery_business_id,
            gallery_address: gallery.gallery_address,
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Change agent data
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function changeGalleryInfo(req, res) 
{
    const User = ModelsService.Models.User;
    const Gallery = User.Gallery;
    try 
    {
        let agent_data = req.body.gallery_agent;
        const gallery = await Gallery.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        gallery.gallery_agent = agent_data;
        await gallery.save();
        return res.status(200).json({
            ...gallery.toJSON(),
            gallery_agent: gallery.gallery_agent,
            gallery_business_id: gallery.gallery_business_id,
            gallery_address: gallery.gallery_address,
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function changeClosedMode(req, res) 
{
    const User = ModelsService.Models.User;
    const Gallery = User.Gallery;
    try 
    {
        const gallery = await Gallery.findOne({ _id: req.token_decoded.uid });
        if (!gallery) 
        {
            throw new User.Exceptions.UserNotFoundException();
        }
        if (req.body.closed === true && !gallery.gallery_closed) 
        {
            gallery.gallery_closed = {
                date : new Date(),
                reason : req.body.reason,
            };
        }
        else if (req.body.closed === false && gallery.gallery_closed) 
        {
            gallery.gallery_closed = null;
            // TODO: Send email to all the users in the gallery_notify list
            gallery.gallery_notify_me_when_opens = []; 
        }
        else if (req.body.closed === true) 
        {
            gallery.gallery_closed = {
                date: gallery.gallery_closed.date,
                reason: req.body.reason,
            };
        }
        await gallery.save();
        const response = gallery.gallery_closed;
        return res.status(200).json(response);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}



module.exports = {
    changeShipping,
    getBankData,
    changeBankData,
    getGalleryInfo,
    changeGalleryInfo,
    changeClosedMode,
};