const GALLERY_TYPES = require("./gallery.types");
const DRAFT_TYPES = require("./draft.types");
const SIGNATURE_TYPES = require("./signature.types");
const PASSWORD_TYPES = require("./password.types");
const lodash = require("lodash");

const EmailTypes = {

    ...GALLERY_TYPES,
    ...DRAFT_TYPES,
    ...SIGNATURE_TYPES,
    ...PASSWORD_TYPES,

    get: function (type) 
    {
        if(!type) 
        {
            throw new Error("Email type is required");
        }
        if (this[type]) 
        {
            return this[type];
        }

        // If it is an object, search for the type property
        for (const key in this) 
        {
            if(lodash.isEqual(this[key], type)) 
            {
                return this[key];
            }
        }

        throw new Error(`Email type ${type} not found`);
    }
    
};

module.exports = EmailTypes;