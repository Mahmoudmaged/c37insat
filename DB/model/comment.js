const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: String,
    postID: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

}, {
    timestamps: true
})

const commentModel = mongoose.model('Comment', commentSchema)
module.exports = commentModel