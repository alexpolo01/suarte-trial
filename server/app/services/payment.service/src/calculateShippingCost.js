function calculateShippingCost(artwork, country)
{
    let price = 0;
    if (artwork.artwork_shipping.artwork_shipping_own.location == country)
    {
        if (artwork.artwork_shipping.artwork_shipping_own.payer != "You")
        {
            price = artwork.artwork_shipping.artwork_shipping_own.price;
        }
    } 
    else if (artwork.artwork_shipping.artwork_shipping_rest.payer != "You")
    {
        price = artwork.artwork_shipping.artwork_shipping_rest.price;
    }

    for (const exception of artwork.artwork_shipping.artwork_shipping_exceptions)
    {
        if (exception.location == country)
        {
            if (exception.payer != "You")
            {
                price = exception.price;
            }
        }
    }

    return parseFloat(price);

}

module.exports = {
    calculateShippingCost
};