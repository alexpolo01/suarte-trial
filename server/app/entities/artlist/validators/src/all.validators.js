function title_lenght(v) 
{
    const Artlist = require("@entities/artlist/model");
    if(v.length >= 1 && v.length <= 48) 
    {
        return true;
    }
    throw new Artlist.Exceptions.ArtlistBadRequestException({
        error_type: "ARTLIST_TITLE_LENGTH",
        error_message: "Artlist title length must be between 1 and 48 characters",
        error_data: {
            artlist_title: v
        }
    });
}

function description_lenght(v) 
{
    const Artlist = require("@entities/artlist/model");
    if(v.length <= 256) 
    {
        return true;
    }
    throw new Artlist.Exceptions.ArtlistBadRequestException({
        error_type: "ARTLIST_DESCRIPTION_LENGTH",
        error_message: "Artlist description length must be between 1 and 256 characters",
        error_data: {
            artlist_description: v
        }
    });
}

const ArtlistValidators = {
    title_lenght,
    description_lenght,
};

module.exports = ArtlistValidators;