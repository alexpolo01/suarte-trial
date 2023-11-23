const ModelsService = require("./models.service");

async function usernameExists(username, listOfModels = null) 
{

    const defaultPossibleModels = [
        ModelsService.Models.User,
        ModelsService.Models.GalleryRequest,
    ];

    let possibleModels = listOfModels ?? defaultPossibleModels;

    for (const model of possibleModels) 
    {
        if (!model) 
        {
            continue;
        }
        let user = await model.findOne({ user_username: username });
        if (user) 
        {
            return {
                exists: true,
                model: model,
                modelName: model.name ?? model.modelName,
                user: user
            };
        }
    }

    return {
        exists: false
    };

}

async function emailExists(email, listOfModels = null, keys = ["user_email"]) 
{

    const defaultPossibleModels = [
        ModelsService.Models.User,
        ModelsService.Models.GalleryRequest,
        ModelsService.Models.GalleryArtist
    ];

    let possibleModels = listOfModels ?? defaultPossibleModels;

    for (const model of possibleModels) 
    {
        let user = null;
        for (const key of keys) 
        {
            try 
            {
                user = await model.findOne({ [key]: email });
                if (user) 
                {
                    return {
                        exists: true,
                        key: key,
                        model: model,
                        modelName: model.name ?? model.modelName,
                        user: user
                    };
                }
            }
            catch (error) 
            {
                continue;
            }
        }
    }

    return {
        exists: false
    };

}


module.exports = {
    usernameExists,
    emailExists
};