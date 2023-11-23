const DbService = require("@services/db.service");
const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema");

const userSchema = new mongoose.Schema({
    _id: { type: String },
    user_email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    user_name: {
        type: String,
        index: "text"
    },
    user_username: {
        type: String,
        index: {
            unique: true,
            sparse: true,
        }
    },
    user_image: imageSchema,
    user_profile_info: {
        user_description: String,
        user_location: String,
        user_artworks: {
            type: Number,
            required: true,
            default: 0,
        },
        user_inspiring: {
            type: Number,
            required: true,
            default: 0,
        },
        user_likes: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    user_preferences: {
        type: Object,
        default: {
            theme: "starry_moon",
            mode: "dark",
            language: "en",
        },
    },
    user_gender: Object,
    user_birth: Object,
    user_flags: {
        onboarding_completed: {
            type: Boolean,
            required: true,
            default: false,
        },
        suarteroad_completed: {
            type: Boolean,
            required: true,
            default: false,
        },
        username_change_date: Date,
    },
    user_referral: {
        type: String,
        ref: "User",
        required: false,
        default: null,
    },
    __t: {
        type: String,
        required: true,
        default: "",
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters : true,
        transform: function (doc, ret) 
        {     
            delete ret.__t;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.user_addresses;
            delete ret.gallery_bank_data;
            delete ret.gallery_agent;
            delete ret.gallery_business_id;
            delete ret.gallery_notify_me_when_opens;
            if(!ret.user_flags.suarteroad_completed) 
            {
                ret.user_flags.suarteroad_completed = false;
            }
        }
    },
    toObject: {
        virtuals: true,
        getters : true,
        transform: function (doc, ret) 
        {
            delete ret.__t;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.user_addresses;
            delete ret.gallery_bank_data;
            delete ret.gallery_agent;
            delete ret.gallery_business_id;
            delete ret.gallery_notify_me_when_opens;
            if(!ret.user_flags.suarteroad_completed) 
            {
                ret.user_flags.suarteroad_completed = false;
            }
        }
    },
    virtuals: {
        user_type: {
            get: function () 
            {
                return this.__t.toLowerCase();
            }
        }
    }
});

userSchema.methods.canChangeUsername = function ()
{
    if(!this.user_flags.username_change_date) 
    {
        return true;
    }
    const date = new Date(this.user_flags.username_change_date);
    const now = new Date();
    const diff = now - date;
    const days = diff / (1000 * 60 * 60 * 24);
    if(this.user_type === "gallery") 
    {
        return days >= 14;
    } 
    return days >= 365;
};

module.exports = userSchema;