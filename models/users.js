const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    googleId: {
        type: String,  // Store Google user ID
        unique: true,
        sparse: true  // Allows users without Google ID (local users)
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        url: {
            type: String,
            default: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
        },
        filename: {
            type: String,
            default: "online IMG"
        }
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
});

userSchema.plugin(passportLocalMongoose);//{ usernameField: "email" } if we want default to be email

let User = mongoose.model('User', userSchema);

module.exports = User;