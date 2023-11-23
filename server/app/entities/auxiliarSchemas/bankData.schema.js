const { GenericKaindaExceptions } = require("kainda");
const DbService = require("@services/db.service");
const ibantools = require("ibantools");
const mongoose = DbService.get();

const bankDataSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        required: true
    },
    swift_code: {
        type: String,
        required: true
    },
    account_holder_name: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    },
    one_stop_shop: {
        type: Boolean,
        default: false
    }
});

bankDataSchema.validate = function (bankData) 
{
    const iban = bankData.iban.replace(/\s/g, "");
    if (!ibantools.isValidIBAN(iban)) 
    {
        throw new GenericKaindaExceptions.Kainda400Exception({
            error_type: "INVALID_IBAN",
            error_message: "The IBAN provided is not valid",
            error_data: {
                iban: bankData.iban,
                element: "iban"
            }
        });
    }
    if (!ibantools.isValidBIC(bankData.swift_code)) 
    {
        throw new GenericKaindaExceptions.Kainda400Exception({
            error_type: "INVALID_BIC",
            error_message: "The BIC is not valid",
            error_data: {
                bic: bankData.swift_code,
                element: "swift_code"
            }
        });
    }
    return true;
};

module.exports = bankDataSchema;


