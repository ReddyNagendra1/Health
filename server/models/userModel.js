const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDoctor: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    seenNofications: {
        type: Array,
        default: [],
    },
    unseenNofications: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;