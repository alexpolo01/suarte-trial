async function searchArtworks(req, model, query, query2) 
{
    let pipeline = [];
    const searchQuery = req.query.q ?? "";

    if (searchQuery) 
    {
        pipeline.push({
            $search: {
                index: "searchArtworks",
                compound: {
                    should: [
                        {
                            text: {
                                query: searchQuery,
                                path: "artwork_about.artwork_title",
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            }
                        },
                        {
                            text: {
                                query: searchQuery,
                                path: "artwork_about.artwork_description",
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            }
                        }
                    ]
                }
            },
        });
    }

    if (query && req.query.size)
    {
        pipeline.push({
            $addFields: {
                "artwork_about.artwork_size.length": {
                    $toDouble: "$artwork_about.artwork_size.length"
                },
                "artwork_about.artwork_size.height": {
                    $toDouble: "$artwork_about.artwork_size.height"
                }
            }
        });
    }

    if (query)
    {
        pipeline.push({
            $match: query
        });
    }

    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "artwork_about.artwork_artist",
                foreignField: "_id",
                as: "artwork_about.artwork_artist",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "artwork_about.artwork_gallery",
                foreignField: "_id",
                as: "artwork_about.artwork_gallery",
            },
        },
        {
            $lookup: {
                from: "galleryartists",
                localField: "artwork_about.artwork_gallery_artist",
                foreignField: "_id",
                as: "artwork_about.artwork_gallery_artist",
            },
        },
        {
            $unwind: {
                path: "$artwork_about.artwork_artist",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $unwind: {
                path: "$artwork_about.artwork_gallery",
            }
        },
        {
            $unwind: {
                path: "$artwork_about.artwork_gallery_artist",
            }
        },
        {
            $addFields: {
                // Add user_type to artwork_about.artwork_gallery 
                "artwork_about.artwork_gallery.user_type": {
                    $toLower: "$artwork_about.artwork_gallery.__t"
                }
            }
        },
    );

    if (query2)
    {
        pipeline.push({
            $match: query2
        });
    }

    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        customLabels: {
            docs: "data",
        }
    };

    if (req.query.sort && req.query.sort === "Recent")
    {
        options.sort = { "createdAt": -1 };
    }
    else if (req.query.sort && req.query.sort === "High to low")
    {
        options.sort = { "artwork_about.artwork_price": -1 };
    }
    else if (req.query.sort && req.query.sort === "Low to high")
    {
        options.sort = { "artwork_about.artwork_price": 1 };
    }
    else if (req.query.sort && req.query.sort === "Limited editions")
    {
        options.sort = {
            "artwork_limited_editions": -1,
            "createdAt": -1
        };
    }
    else if (req.query.sort && req.query.sort === "Relevant")
    {
        options.sort = { "likes": -1 };
        pipeline.push({
            $lookup: {
                from: "artworklikes",
                localField: "_id",
                foreignField: "artwork",
                as: "artwork_likes"
            }
        });
        pipeline.push({
            $addFields: {
                likes: {
                    $size: "$artwork_likes"
                }
            }
        });
        pipeline.push({
            $project: {
                artwork_likes: 0
            }
        });
    }

    if (!searchQuery && !req.query.sort) 
    {
        options.sort = { createdAt: -1 };
    }

    const aggregatePipeline = model.subModel.aggregate(pipeline);
    const results = await model.subModel.aggregatePaginate(aggregatePipeline, options);
    results.q = searchQuery;
    return results;
}

module.exports = {
    searchArtworks
};