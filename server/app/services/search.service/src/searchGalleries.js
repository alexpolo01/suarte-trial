const { addFollowData } = require("./addFollowData");
const { addProfileInfo } = require("./addProfileInfo");

async function searchGalleriesInHome(req, model) 
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
        },
        {
            $project: {
                gallery_bank_data: 0,
                gallery_agent: 0
            }
        }
    );

    if (req.token_decoded?.uid)
    {
        const followPipeline = addFollowData(req.token_decoded.uid);
        pipeline.push(...followPipeline);
    }

    pipeline.push(...addProfileInfo("gallery"));

    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 10,
        customLabels: {
            docs: "data",
        }
    };
    if (!searchQuery) 
    {
        options.sort = { "user_profile_info.user_inspiring" : -1 };
    }
    if (req.query.sort)
    {
        if (req.query.sort === "name")
        {
            options.sort = { user_name: 1 };
            options.collation = { locale: "en", strength: 2 };
        }
    }
    const aggregatePipeline = model.subModel.aggregate(pipeline, options);
    const results = await model.subModel.aggregatePaginate(aggregatePipeline, options);
    results.q = searchQuery;
    return results;
}

module.exports = {
    searchGalleriesInHome
};