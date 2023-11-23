async function searchFollowing(req, model) 
{
    const searchQuery = req.query.username ?? "";
    const follower_id = req.params.user_id ?? "";

    let pipeline = [
        {
            $match: {
                follower: follower_id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "followee",
                foreignField: "_id",
                as: "user_details",
            },
        },
        {
            $unwind: "$user_details",
        },
        {
            $project: {
                user_details: 1,
            },
        },
    ];

    if (searchQuery) 
    {
        pipeline.push({
            $match: {
                "user_details.user_username": { $regex: searchQuery, $options: "i" },
            },
        });
    }

    pipeline.push({
        $addFields: {
            user_type: {
                $toLower: "$__t",
            },
        },
    });

    const options = {
        offset: req.query.offset ?? 0,
        limit: req.query.limit ?? 20,
        customLabels: {
            docs: "data",
        },
    };
    const aggregatePipeline = model.subModel.aggregate(pipeline);
    const results = await model.subModel.aggregatePaginate(
        aggregatePipeline,
        options
    );
    results.query = req.query.username;
    results.data = results.data.map(async (user) => 
    {
        let details = {
            ...user.user_details,
            user_type: user.user_details.__t.toLowerCase(),
        };
        delete details.__t;
        delete details.gallery_agent;
        delete details.gallery_bank_data;
        delete details.gallery_shippings;
        delete details.user_addresses;
        if (req.token_decoded?.uid) 
        {
            details.im_following = await model.isFollowing(
                req.token_decoded.uid,
                user.user_details._id
            );
            details.is_following_me = await model.isFollowing(
                user.user_details._id,
                req.token_decoded.uid
            );
        }
        return details;
    });
    results.data = await Promise.all(results.data);
    return results;
}

module.exports = {
    searchFollowing,
};
