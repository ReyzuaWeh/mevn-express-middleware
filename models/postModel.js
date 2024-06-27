const mongoose = require('mongoose');
const userModel = require('./userModel');

const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Perlu user'],
        ref: 'user'
    },
    comment: {
        type: String,
        required: [true, 'Perlu isi komen'],
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
commentsSchema.pre('save', async function (next) {
    const exist = await userModel.user.exists({ _id: this.user })
    if (!exist) {
        return next(new Error('User komen ini tidak ditemukan'));
    }
    return next();
});
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Perlu user'],
        ref: 'user'
    },
    post: {
        type: String,
        required: [true, 'Perlu post sesuatu']
    },
    comments: {
        type: [commentsSchema]
    },
    likes: {
        type: Number,
        default: 0
    },
    edited: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});
postSchema.pre('save', async function (next) {
    const exist = await userModel.user.exists({ _id: this.user })
    if (!exist) {
        return next(new Error('User post ini tidak ditemukan'));
    }
    this.edited = this.updatedAt.getTime() !== this.createdAt.getTime();
    return next();
});
const post = mongoose.model('post', postSchema)
module.exports = { post };