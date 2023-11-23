const ModelsService = require("@services/models.service");

function AboutValidation(about) 
{
    const Draft = ModelsService.Models.Draft;
    if (about.artwork_title.length < 3) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "TITLE_TOO_SHORT",
            error_message: "The title of the artwork is too short.",
            error_data: {
                element: "artwork_title",
                value: about.artwork_title
            }
        });
    }
    if (about.artwork_description.length < 10) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "DESCRIPTION_TOO_SHORT",
            error_message: "The description of the artwork is too short.",
            error_data: {
                element: "artwork_description",
                value: about.artwork_description
            }
        });
    }
    if (about.artwork_medium.length === 0) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "ARRAY_EMPTY",
            error_message: "The medium of the artwork is too short.",
            error_data: {
                element: "artwork_medium",
                value: about.artwork_medium
            }
        });
    }
    if (about.artwork_theme.length === 0) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "ARRAY_EMPTY",
            error_message: "The theme of the artwork is too short.",
            error_data: {
                element: "artwork_theme",
                value: about.artwork_theme
            }
        });
    }
    if (about.artwork_feeling.length === 0) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "ARRAY_EMPTY",
            error_message: "The feeling of the artwork is too short.",
            error_data: {
                element: "artwork_feeling",
                value: about.artwork_feeling
            }
        });
    }
    if (about.artwork_color.length === 0) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "ARRAY_EMPTY",
            error_message: "The color of the artwork is too short.",
            error_data: {
                element: "artwork_color",
                value: about.artwork_color
            }
        });
    }
    // Height and length must be a number greater than 0, can be a float
    if (isNaN(about.artwork_size.height) || about.artwork_size.height <= 0
        || isNaN(about.artwork_size.length) || about.artwork_size.length <= 0) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "INVALID_SIZE",
            error_message: "The size of the artwork is invalid.",
            error_data: {
                element: "artwork_size",
                value: about.artwork_size
            }
        });
    }
    // Price must be a number and integer and greater than 0
    if (!Number.isInteger(Number.parseFloat(about.artwork_price)) || Number.parseInt(about.artwork_price) <= 0 || isNaN(about.artwork_price)) 
    {
        throw new Draft.Exceptions.DraftBadRequestException({
            error_type: "INVALID_PRICE",
            error_message: "The price of the artwork is invalid.",
            error_data: {
                element: "artwork_price",
                value: about.artwork_price,
            }
        });
    }
}

function MediaValidation() 
{

}

function ShippingValidation(shipping) 
{
    const Draft = ModelsService.Models.Draft;
    if (shipping.artwork_shipping_own.payer !== "You") 
    {
        // Price must be a number and integer and greater than 0
        if (!Number.isInteger(Number.parseFloat(shipping.artwork_shipping_own.price)) || Number.parseInt(shipping.artwork_shipping_own.price) <= 0 || isNaN(shipping.artwork_shipping_own.price)) 
        {
            throw new Draft.Exceptions.DraftBadRequestException({
                error_type: "INVALID_PRICE",
                error_message: "The price of the artwork is invalid.",
                error_data: {
                    element: "artwork_shipping_own",
                    value: shipping.artwork_shipping_own.price,
                }
            });
        }
    }
    if (shipping.artwork_shipping_rest.payer !== "You") 
    {
        // Price must be a number and integer and greater than 0
        if (!Number.isInteger(Number.parseFloat(shipping.artwork_shipping_rest.price)) || Number.parseInt(shipping.artwork_shipping_rest.price) <= 0 || isNaN(shipping.artwork_shipping_rest.price)) 
        {
            throw new Draft.Exceptions.DraftBadRequestException({
                error_type: "INVALID_PRICE",
                error_message: "The price of the artwork is invalid.",
                error_data: {
                    element: "artwork_shipping_rest",
                    value: shipping.artwork_shipping_rest.price,
                }
            });
        }
    }

    if (shipping.artwork_shipping_exceptions && Object.keys(shipping.artwork_shipping_exceptions).length > 0) 
    {
        for (let i = 0; i < Object.keys(shipping.artwork_shipping_exceptions).length; i++) 
        {
            let key = Object.keys(shipping.artwork_shipping_exceptions)[i];
            if (shipping.artwork_shipping_exceptions[key].payer === "You") 
            {
                continue;
            }
            if (!Number.isInteger(Number.parseFloat(shipping.artwork_shipping_exceptions[key].price)) || Number.parseInt(shipping.artwork_shipping_exceptions[key].price) <= 0 || isNaN(shipping.artwork_shipping_exceptions[key].price)) 
            {
                throw new Draft.Exceptions.DraftBadRequestException({
                    error_type: "INVALID_PRICE",
                    error_message: "The price of the artwork is invalid.",
                    error_data: {
                        element: shipping.artwork_shipping_exceptions[key].element,
                        value: shipping.artwork_shipping_exceptions[key].price,
                    }
                });
            }
        }
    }

}


const DraftValidators = {
    AboutValidation,
    MediaValidation,
    ShippingValidation
};

module.exports = DraftValidators;