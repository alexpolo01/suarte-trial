const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

async function createUserAddress(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findOne({ _id: req.token_decoded.uid });
        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
            });
        }

        user.user_addresses.push(req.body);
        await user.save();
        return res.status(201).json(user.user_addresses[user.user_addresses.length - 1]);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function getUserAddress(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findOne({ _id: req.token_decoded.uid });
        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
            });
        }

        return res.status(200).json(user.user_addresses ?? []);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function updateUserAddress(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findOne({ _id: req.token_decoded.uid });
        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
            });
        }

        // Get the index of the address to update
        const index = user.user_addresses.findIndex((address) => 
        { 
            return address._id == req.params.id; 
        });

        if (index == -1)
        {
            throw new User.Exceptions.UserAddressNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "Address not found",
            });
        }

        // Update the address
        user.user_addresses[index] = req.body;

        await user.save();
        return res.status(200).json(user.user_addresses.find((address) => 
        { 
            return address._id == req.params.id; 
        }));
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function deleteUserAddress(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findOne({ _id: req.token_decoded.uid });
        if (!user)
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: "User not found",
            });
        }

        user.user_addresses = user.user_addresses.filter((address) => 
        {
            return address._id != req.params.id;
        });

        await user.save();
        return res.status(200).json(user.user_addresses);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createUserAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress
};