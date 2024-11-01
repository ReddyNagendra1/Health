const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        Specialization: {
            type: String,
            required: true,
        },
        Experience: {
            type: String,
            required: true,
        },
        Availability: {
            type: Array,
            required: true,
        },
        status: {
            type: String,
            default: 'pending'
        }
    },
    {
        timestamps: true,
    }

);

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;