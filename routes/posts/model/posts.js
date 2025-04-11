const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postSchema.virtual('commentCount', {
    ref: 'Comment',
    localField: 'postId',
    foreignField: 'postId',
    count: true
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;