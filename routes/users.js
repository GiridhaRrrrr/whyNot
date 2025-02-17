const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

let wrapAsync = require("../utils/wrapAsyncFunction.js");
const User = require('../models/users.js');
const passport = require('passport');
const { isLoggedIn,savedRedirecturl } = require('../utils/middleware.js');
const Post = require('../models/posts.js');


// signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
router.post("/signup", upload.single('img'), wrapAsync(async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;

        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        newUser.img = { url, filename };
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        // after Signup direct Login
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to whyNot");
            res.redirect("/posts");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/user/signup");
    }
}));

// login - get
router.get("/login", (req, res) => {
    res.render('users/login');
});

// login
router.post('/login',savedRedirecturl, passport.authenticate("local",
     {failureRedirect: '/user/login', failureFlash: true}), (req, res) => {
        req.flash("success", "Welcome Back to whyNot!");
        if(res.locals.redirectUrl){
            let redirect = res.locals.redirectUrl;
            return res.redirect(redirect || "/posts");
        }
        res.redirect("/posts");        
})

// logout
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are LoggedOut successfully");
        res.redirect('/posts');
    });
});

// all users
router.get("/allUsers", wrapAsync(async (req, res) => {
    let users = await User.find();    
    res.render("users/allUsers", {users});
}));

// single user
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    let posts = await Post.find();    
    let userPosts = posts.filter(post => post.owner && post.owner.equals(id));
    res.render("users/user", {user, userPosts});
}));

// follow button
router.post("/:id/follow", isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let followedPerson = await User.findById(id);
        let followingPerson = await User.findByUsername(req.user.username);
        
        if (!followedPerson || !followingPerson) {
            req.flash("error", "User not found");
            return res.redirect("/user/allUsers");
        }

        let isFollowing = followingPerson.following.includes(id);

        if (isFollowing) {
            // Unfollow logic
            followingPerson.following.pull(id);
            followedPerson.followers.pull(followingPerson._id);
        } else {
            // Follow logic
            followingPerson.following.push(id);
            followedPerson.followers.push(followingPerson._id);
        }

        await followingPerson.save();
        await followedPerson.save();

        res.redirect(req.get('Referrer') || '/user/allUsers');
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/user/allUsers");
    }
});


module.exports = router;