const mongoose = require('mongoose');
const { Schema } = mongoose;
let Posts = require("./posts")


let answerSchema = new Schema({
    intuition: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    img: {
        url: String,
        filename: String,
    },
    reference: {
        type: [String],
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"        
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    
    }],
});

let Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;