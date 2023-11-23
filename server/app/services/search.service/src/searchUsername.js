async function searchUsersByUsername(req, model) 
{
    let pipeline = [];
    const searchQuery = req.query.q ?? "";

    if (searchQuery) 
    {
        pipeline.push({
            $search: {
                "index": "searchUsersByUsername",
                "autocomplete": {
                    "query": searchQuery,
                    "path": "user_username",
                    "tokenOrder": "any",
                }
            }
        });
    }

    pipeline.push({
        $addFields: {
            user_type: {
                $toLower: "$__t"
            }
        }
    });

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
    searchUsersByUsername
};