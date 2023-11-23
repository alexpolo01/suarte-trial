function addFollowData(uid) 
{
    return [
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
                                $and: [
                                    { $eq: ["$follower", "$$userId"] },
                                    { $eq: ["$followee", uid] }
                                ]
                            }
                        }
                    }
                ],
                as: "isFollowingMe"
            }
        },
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
                                $and: [
                                    { $eq: ["$followee", "$$userId"] },
                                    { $eq: ["$follower", uid] }
                                ]
                            }
                        }
                    }
                ],
                as: "imFollowing"
            }
        },
        {
            $addFields: {
                im_following: { $gt: [{ $size: "$imFollowing" }, 0] },
                is_following_me: { $gt: [{ $size: "$isFollowingMe" }, 0] }
            }
        },
        {
            $project: {
                imFollowing: 0,
                isFollowingMe: 0
            }
        }
    ];
}

module.exports = {
    addFollowData
};
