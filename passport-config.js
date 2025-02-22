const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/users.js');

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://whynot-e9sk.onrender.com/user/auth/google/callback",
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Check if user with the same email exists
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            // If no user exists, create a new one
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                img: {
                    url: profile.photos[0].value,
                    filename: "Google Profile Pic"
                }
            });

            let newUser = await user.save(); // Save the new user
            return done(null, newUser);
        }
        // Return the found/created user
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
