const countries = require("./countries.json");

function calculateTaxes({ price, buyer_country, seller_country })
{
    const isBuyerFromEU = countries.european_countries.includes(buyer_country);
    const isSellerFromEU = countries.european_countries.includes(seller_country);
    if(!isBuyerFromEU || !isSellerFromEU)
    {
        return 0;
    }
    let country = countries.countries.filter(country => 
    {
        return country.name === buyer_country;
    });
    let tax = country[0].vat;
    tax = tax / 100;
    return parseFloat((price * tax).toFixed(2));
}

module.exports = {
    calculateTaxes
};