let data = [
    {
        _id: "pI5Cb27JIYUNyS3VQwEOdQHeCdD2",
        user_email: "gallery@dev.suarte.art",
        user_name: "Gallery Art",
        user_username: "gallery",
        __t: "Gallery",
        user_preferences: {
            "theme": "starry_moon",
            "mode": "dark",
            "language": "en"
        },
        user_flags: {
            onboarding_completed: false,
        },
        gallery_address: {
            city: "Petrer",
            street: "Calle Jose Maria Guerrero 3 2A",
            zip_code: "03610",
            region: "Alicante",
            country: "Afghanistan"
        },
        gallery_business_id: "123456",
        gallery_agent: {
            agent_birth: {
                day: 12,
                month: 5,
                year: 2000
            },
            agent_phone: {
                phone_number: "633029447",
                phone_prefix: "+93"
            },
            agent_name: "Sergio Rodriguez ",
            agent_gender: "Male"
        }
    },
    {
        _id: "ulI1jIpGOBVBzgi3GlQuq6PLrWM2",
        user_email: "admin@dev.suarte.art",
        user_username: "admin",
        __t: "Admin",
        user_preferences: {
            "mode": "dark",
            "theme": "starry_moon",
            "language": "en"
        },
        user_flags: {
            onboarding_completed: false
        }
    },
    {
        _id: "n2zqKGqUAOPp4pek9T5VyT3QVRi1",
        user_email: "collector@dev.suarte.art",
        user_username: "collector",
        __t: "Collector",
        user_preferences: {
            "mode": "dark",
            "theme": "starry_moon",
            "language": "en"
        },
        user_flags: {
            onboarding_completed: false
        }
    },
    // {
    //     _id: "29QbTySidoOhWrYIdBDKYUO1jL33",
    //     user_email: "artist@dev.suarte.art",
    //     user_username: "artist",
    //     user_name: "Suarte Artist",
    //     __t: "Artist",
    //     user_preferences: {
    //         "mode": "dark",
    //         "theme": "starry_moon",
    //         "language": "en"
    //     },
    //     user_flags: {
    //         onboarding_completed: false
    //     }
    // }
];

if (process.env.NODE_ENV === "production") 
{
    data = data.filter((user) => user.user_email === "admin@dev.suarte.art");
    data[0]._id = "5QFwgwEoaXbxjJ0ANBz4X68kLp73";
    data[0].user_email = "admin@suarte.art";
}

const UserSeeders = {
    data
};

module.exports = UserSeeders;