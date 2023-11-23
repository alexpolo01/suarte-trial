const { addFollowData } = require("./addFollowData");

async function searchCollectorsInHome(req, model) 
{
    let pipeline = [];
    const searchQuery = req.query.q ?? "";

    if (searchQuery) 
    {
        pipeline.push({
            $search: {
                index: "searchUsers",
                compound: {
                    should: [
                        {
                            text: {
                                query: searchQuery,
                                path: "user_name",
                                fuzzy: {
                                    maxEdits: 2,
                                    prefixLength: 2
                                }
                            }
                        },
                        {
                            text: {
                                query: searchQuery,
                                path: "user_username",
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
            $match: {
                "user_flags.onboarding_completed": true,
            }
        },
        {
            $addFields: {
                user_type: {
                    $toLower: "$__t"
                }
            }
        }
    );

    if (req.token_decoded?.uid)
    {
        const followData = addFollowData(req.token_decoded.uid);
        pipeline.push(...followData);
    }

    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        customLabels: {
            docs: "data",
        }
    };
    const aggregatePipeline = model.subModel.aggregate(pipeline);
    const results = await model.subModel.aggregatePaginate(aggregatePipeline, options);
    results.q = searchQuery;
    return results;
}

module.exports = {
    searchCollectorsInHome
};