const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const artistrequestSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    user_code: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    gallery_artist : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GalleryArtist",
        required: true
    }
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("ArtistRequest", artistrequestSchema);
const ArtistRequest = new KaindaModel(tmpModel);
module.exports = ArtistRequest;

ArtistRequest.generateCode = function (digits = 6) 
{
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

ArtistRequest.checkProfileAvailability = async function (email) 
{
    const { emailExists } = require("@services/userExists.service");
    const Models = require("@services/models.service").Models;
    let aux = await emailExists(email, [Models.Artist]);
    if (aux.user && aux.user.user_email === email) 
    {
        throw new ArtistRequest.Exceptions.ArtistRequestAlreadyExistsException({
            error_type: "PROFILE_ALREADY_CLAIMED",
            error_message: "Profile already claimed",
            error_data: {
                email,
                element: "user_email",
                error_code: "PROFILE_ALREADY_CLAIMED"
            }
        });
    }
    aux = await emailExists(email, [Models.GalleryArtist], ["artist_email"]);
    if (!aux.exists) 
    {
        throw new ArtistRequest.Exceptions.ArtistRequestNotFoundException({
            error_type: "NOT_FOUND",
            error_message: "Email not found",
            error_data: {
                email,
                element: "user_email",
                error_code: "NOT_FOUND"
            }
        });
    }
    return aux.user;
};
