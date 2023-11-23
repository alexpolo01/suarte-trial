async function searchArtlists(req, model) 
{
    let pipeline = [];
    const searchQuery = req.query.q ?? "";

    if (searchQuery) 
    {
        pipeline.push({
            $search: {
                index: "searchArtlist",
                compound: {
                    should: [
                        {
                            text: {
                                query: searchQuery,
                                path: "artlist_title",
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            }
                        },
                        {
                            text: {
                                query: searchQuery,
                                path: "artlist_description",
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            }
                        }
                    ]
                }
            }
        });
    }

    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "artlist_creator",
                foreignField: "_id",
                as: "artlist_creator",
            },
        },
        {
            $lookup : {
                from: "artlistlikes",
                localField: "_id",
                foreignField: "artlist",
                as: "artlist_likes"
            }
        },
        {
            $unwind: "$artlist_creator",
        },
        {
            $addFields: {
                artlist_likes : {
                    $size: "$artlist_likes"
                }
            }
        },
    );


    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        customLabels: {
            docs: "data",
        },
        sort: { "artlist_likes": -1 }
    };

    const aggregatePipeline = model.subModel.aggregate(pipeline);
    const results = await model.subModel.aggregatePaginate(aggregatePipeline, options);
    results.q = searchQuery;
    return results;
}

module.exports = {
    searchArtlists
};