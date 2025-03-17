const { required } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        url: String,
        filename: String,
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }],
    tags: {
        type: [String],
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"        
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

let Post = mongoose.model('Post', postSchema);

// using .post method to delete all reviews when post is deleted


module.exports = Post;
