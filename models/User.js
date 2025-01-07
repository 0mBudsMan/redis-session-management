const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    pageVisited: {
        type: Array,
        default: [],
    },
    preferences: {
        type: Object,
        default: {},
    },

});



const User = mongoose.model('User', userSchema);

module.exports = User;
