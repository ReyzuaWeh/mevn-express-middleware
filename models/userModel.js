const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Isi nama'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Isi email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Format email salah"
        }
    },
    password: {
        type: String,
        required: [true, 'Isi password'],
        minLength: [8, 'Minimal 8 char'],
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})
const user = mongoose.model('user', userSchema);
module.exports = { user, mongoose };