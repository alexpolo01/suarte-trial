function parseGallery(gallery)
{
    if (!gallery)
    {
        return {};
    }
    // Gallery is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    gallery = gallery.replace("[", "").replace("]", "");
    const galleryArray = gallery.split(",");
    galleryArray.forEach((gallery, index) =>
    {
        galleryArray[index] = gallery.trim().replace(/"/g, "");
    });
    return {
        "artwork_about.artwork_gallery": {
            $in: galleryArray,
        }
    };
}

function parseArtist(artist)
{
    const mongoose = require("mongoose");
    if (!artist)
    {
        return {};
    }
    // Artist is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    artist = artist.replace("[", "").replace("]", "");
    const artistArray = artist.split(",");
    artistArray.forEach((artist, index) =>
    {
        artistArray[index] = artist.trim().replace(/"/g, "");
    });
    const onlyArtists = artistArray.map((artist) =>
    {
        try
        {
            new mongoose.Types.ObjectId(artist);
            return;
        }
        catch (error)
        {
            return artist;
        }
    }).filter((artist) => artist);
    const galleryArtists = artistArray.map((artist) =>
    {
        try
        {
            return new mongoose.Types.ObjectId(artist);
        }
        catch (error)
        {
            return;
        }
    }).filter((artist) => artist);

    return {
        "$or": [
            {
                "artwork_about.artwork_artist": {
                    $in: onlyArtists,
                }
            },
            {
                "artwork_about.artwork_gallery_artist": {
                    $in: galleryArtists,
                }
            }
        ]
    };
}

function parsePrice(price)
{
    if (!price)
    {
        return {};
    }
    // Price is an array of two numbers, but represented as a string.
    // Parse the string into an array of two numbers.
    price = price.replace("[", "").replace("]", "");
    const priceArray = price.split(",");
    const priceMin = parseInt(priceArray[0]);
    const priceMax = parseInt(priceArray[1]);
    return {
        "artwork_about.artwork_price": {
            $gte: priceMin,
            $lte: priceMax,
        }
    };
}

function parseTheme(theme)
{
    if (!theme)
    {
        return {};
    }
    // Theme is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    theme = theme.replace("[", "").replace("]", "");
    const themeArray = theme.split(",");
    themeArray.forEach((theme, index) => 
    {
        themeArray[index] = theme.trim().replace(/"/g, "");
    });
    return {
        "artwork_about.artwork_theme": {
            $in: themeArray,
        }
    };
}

function parseColor(color)
{
    if (!color)
    {
        return {};
    }
    // Color is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    color = color.replace("[", "").replace("]", "");
    const colorArray = color.split(",");
    colorArray.forEach((color, index) =>
    {
        colorArray[index] = color.trim().replace(/"/g, "");
    });
    return {
        "artwork_about.artwork_color": {
            $in: colorArray,
        }
    };
}

function parseMedium(medium)
{
    if (!medium)
    {
        return {};
    }
    const listOfMediums = ["Oil", "Acrylic", "Watercolor", "Gouache", "Tempera", "Pastel", "Pen and Ink", "Graphite Pencils", "Colored Pencils", "Spray Paint", "Organic Paints", "Chalk and Charcoal", "Collage"];
    // Medium is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    medium = medium.replace("[", "").replace("]", "");
    const mediumArray = medium.split(",");
    mediumArray.forEach((medium, index) =>
    {
        mediumArray[index] = medium.trim().replace(/"/g, "");
    });
    if (mediumArray.includes("Mixed Media") || mediumArray.includes("Other"))
    {
        return {
            "artwork_about.artwork_medium": {
                "$or": [
                    {
                        $in: mediumArray,
                    },
                    {
                        $nin: listOfMediums,
                    }
                ]
            }
        };
    }
    return {
        "artwork_about.artwork_medium": {
            $in: mediumArray,
        }
    };
}

function parseFeeling(feeling)
{
    if (!feeling)
    {
        return {};
    }
    // Feeling is an array of strings, but represented as a string.
    // Parse the string into an array of strings.
    feeling = feeling.replace("[", "").replace("]", "");
    const feelingArray = feeling.split(",");
    feelingArray.forEach((feeling, index) =>
    {
        feelingArray[index] = feeling.trim().replace(/"/g, "");
    });
    return {
        "artwork_about.artwork_feeling": {
            $in: feelingArray,
        }
    };
}

function parseSize(size)
{
    if (!size)
    {
        return {};
    }
    // Size is an object, but represented as a string.
    // Parse the string into an object.
    size = JSON.parse(size);
    let width = parseFloat(size.width);
    let height = parseFloat(size.height);
    let condition = size.condition, condition2;
    if (condition === "smaller")
    {
        condition = "$lte";
        condition2 = "$gte";
    }
    else if (condition === "bigger")
    {
        condition = "$gte";
    }
    else
    {
        condition = "$eq";
    }
    let unit = size.unit;
    if (unit === "inches")
    {
        width = width * 2.54;
        height = height * 2.54;
    }
    if (condition2 && !size.isCustomSize)
    {
        return {
            "$and": [
                {
                    "artwork_about.artwork_size.length": {
                        [condition]: width,
                    },
                    "artwork_about.artwork_size.height": {
                        [condition]: height,
                    }
                },
                {
                    "$or": [
                        {
                            "artwork_about.artwork_size.length": {
                                [condition2]: parseFloat(size.minWidth),
                            },
                        },
                        {
                            "artwork_about.artwork_size.height": {
                                [condition2]: parseFloat(size.minHeight),
                            }
                        }
                    ]
                }
            ]
        };
    }
    return {
        "artwork_about.artwork_size.length": {
            [condition]: width,
        },
        "artwork_about.artwork_size.height": {
            [condition]: height,
        }
    };
}



function parseQuery(rawQuery)
{
    let query = {};
    if (!rawQuery)
    {
        return query;
    }

    query = {
        ...parseGallery(rawQuery.gallery),
        ...parseArtist(rawQuery.artist),
        ...parsePrice(rawQuery.price),
        ...parseTheme(rawQuery.theme),
        ...parseColor(rawQuery.color),
        ...parseFeeling(rawQuery.emotion),
        ...parseMedium(rawQuery.medium),
        ...parseSize(rawQuery.size),
    };

    return query;

}

module.exports = {
    parseQuery
};