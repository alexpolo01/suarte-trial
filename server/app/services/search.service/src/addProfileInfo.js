function addCollectorLikes()
{
    return [
        {
            $lookup: {
                from: "products",
                let: { userId: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq: ["$product_artwork", "$$userId"]
                            }
                        }
                    }
                ],
                as: "artworks"
            }
        },
        {
            $lookup: {
                from: "artworklikes",
                localField: "artworks.product_artwork",
                foreignField: "artwork",
                as: "artwork_likes"
            }
        },
        {
            $addFields: {
                "user_profile_info.user_likes": { $size: "$artwork_likes" },
                "user_profile_info.user_artworks": { $size: "$artworks" }
            }
        },
    ];
}

function addArtistLikes()
{
    return [
        {
            $lookup: {
                from: "artworks",
                let: { userId: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq: ["$artwork_about.artwork_artist", "$$userId"]
                            }
                        }
                    }
                ],
                as: "artworks"
            }
        },
        {
            $lookup: {
                from: "artworklikes",
                localField: "artworks._id",
                foreignField: "artwork",
                as: "artwork_likes"
            }
        },
        {
            $addFields: {
                "user_profile_info.user_likes": { $size: "$artwork_likes" },
                "user_profile_info.user_artworks": { $size: "$artworks" }
            }
        },
    ];
}

function addGalleryLikes()
{
    return [
        {
            $lookup: {
                from: "artworks",
                let: { userId: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq: ["$artwork_about.artwork_gallery", "$$userId"]
                            }
                        }
                    }
                ],
                as: "artworks"
            }
        },
        {
            $lookup: {
                from: "artworklikes",
                localField: "artworks._id",
                foreignField: "artwork",
                as: "artwork_likes"
            }
        },
        {
            $addFields: {
                "user_profile_info.user_likes": { $size: "$artwork_likes" },
                "user_profile_info.user_artworks": { 
                    $size: {
                        $filter: {
                            input: "$artworks",
                            as: "artwork",
                            cond: { $eq: ["$$artwork.artwork_status", "available"] }
                        }
                    }
                }
            }
        },
    ];
}

function addProfileInfo(user_type)
{
    let pipeline = [
        {
            $lookup: {
                from: "follows",
                let: { userId: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq: ["$followee", "$$userId"]
                            }
                        }
                    }
                ],
                as: "followers"
            }
        },
        {
            $addFields: {
                "user_profile_info.user_inspiring": { $size: "$followers" }
            }
        },
    ];
    // Likes calculation
    if (user_type === "collector")
    {
        pipeline.push(...addCollectorLikes());
    }
    else if (user_type === "artist")
    {
        pipeline.push(...addArtistLikes());
    }
    else if (user_type === "gallery")
    {
        pipeline.push(...addGalleryLikes());
    }

    pipeline.push(
        {
            $project: {
                artworks: 0,
                artwork_likes: 0,
                followers: 0
            }
        }
    );

    return pipeline;
}

module.exports = {
    addProfileInfo
};
