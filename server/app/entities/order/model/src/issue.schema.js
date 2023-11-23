const DbService = require("@services/db.service");
const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema");

const issueSchema = new mongoose.Schema({
    issue_artwork_received: {
        type: Boolean,
        required: true,
    },
    issue_message : {
        type: String,
        required: true,
    },
    issue_evidence : {
        type: imageSchema,
        required: true,
    },
    issue_status : {    
        type: String,
        required: true,
        enum: [
            "open",
            "resolved",
            "involve_suarte",
        ],
        default: "open",
    },
}, {
    timestamps: true,
});

module.exports = issueSchema;

