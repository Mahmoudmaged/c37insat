const { boolean } = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: String,
    image: Array,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: String,
    comments: [{type:mongoose.Schema.Types.ObjectId , ref:'Comment'}],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true
})

const postModel = mongoose.model('Post', postSchema)
module.exports = postModel