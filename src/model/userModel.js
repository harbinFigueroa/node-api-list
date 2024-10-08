const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    role: {type: String, default: "user"},
    validationToken: {type: String},
    validUser: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);