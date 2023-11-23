async function suarteWorld(req, model, query) 
{
    let pipeline = [];
    const searchQuery = parseInt(req.query.seed) ?? new Date().getTime();

    if (searchQuery) 
    {
        pipeline.push({
            $addFields: {
                random: {
                    $function: {
                        body: function (artwork, seed)
                        {
                            const createdAtTimestamp = artwork.createdAt.getTime();
                            // a simple custom "hash" of the timestamp
                            const hash = (createdAtTimestamp * 17 + seed * 31) % 1000;
                            return hash; 
                        },
                        args: ["$$ROOT", searchQuery],
                        lang: "js",
                    },
                },
            },
        }, {
            $sort: {
                random: 1,
            }
        });
    }

    if (query) {
        pipeline.push({
          $match: query,
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
            $unwind: "$artwork_about.artwork_gallery",
        },
        {
            $addFields: {
                "artwork_about.artwork_gallery.user_type": {
                    $toLower: "$artwork_about.artwork_gallery.__t"
                }
            }
        },
        {
            $unwind: "$artwork_about.artwork_gallery_artist",
        }
    );

    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        customLabels: {
            docs: "data",
        }
    };

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
    suarteWorld
};