const DbService = require("@services/db.service");

const mongoose = DbService.get();

const coordinatesSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {
    virtuals: {
        longitude: {
            get: function () 
            {
                return this.coordinates[0];
            },
            set: function (longitude) 
            {
                this.coordinates[0] = longitude;
            }
        },
        latitude: {
            get: function () 
            {
                return this.coordinates[1];
            },
            set: function (latitude) 
            {
                this.coordinates[1] = latitude;
            }
        }
    }
});

module.exports = coordinatesSchema;
