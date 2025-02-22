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
let userController = require("../controllers/user.js")


// signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
router.post("/signup", upload.single('img'), wrapAsync(userController.signUp));

// login - get
router.get("/login", (req, res) => {
    res.render('users/login');
});

// login
router.post('/login',savedRedirecturl, passport.authenticate("local",
     {failureRedirect: '/user/login', failureFlash: true}), userController.login)

// logout
router.get('/logout', userController.logOut);

// all users
router.get("/allUsers", wrapAsync(async (req, res) => {
    let users = await User.find();    
    res.render("users/allUsers", {users});
}));

// single user
router.get("/:id", wrapAsync(userController.user));

// follow button
router.post("/:id/follow", isLoggedIn, userController.follow);

// google routes

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/user/login', failureFlash: true }),
    (req, res) => {
        req.flash("success", "Welcome Back to whyNot!");
        return res.redirect('/posts');
    }
);



module.exports = router;