const User = require('../models/users.js');
const Post = require('../models/posts.js');

module.exports.signUp = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        if(req.file){
            newUser.img = {
                 url: req.file.path,
                 filename: req.file.filename,
                };
        }
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
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
}

module.exports.login =  (req, res) => {
    req.flash("success", "Welcome Back to whyNot!");
    if(res.locals.redirectUrl){
        let redirect = res.locals.redirectUrl;
        return res.redirect(redirect || "/posts");
    }
    res.redirect("/posts");        
}

module.exports.logOut =  (req, res) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are LoggedOut successfully");
        res.redirect('/posts');
    });
}

module.exports.user = async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id);
    let posts = await Post.find();    
    let userPosts = posts.filter(post => post.owner && post.owner.equals(id));
    res.render("users/user", {user, userPosts});
}

module.exports.follow = async (req, res) => {
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
}