const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

let wrapAsync = require("../utils/wrapAsyncFunction.js");
let Post = require("../models/posts.js");
let Answer = require("../models/answers.js");
let User = require("../models/users.js");
const { isLoggedIn, validatePost } = require('../utils/middleware.js');

// AllPosts
router.get('/', wrapAsync(async (req, res) => {
    let posts = await Post.find().populate('owner');
    res.render('posts/allPosts', { posts });
}));

// create a post
router.post('/',isLoggedIn,upload.single('post[img]'), validatePost, wrapAsync(async (req, res) => {
    let tagsArray = req.body.post.tags; // Get tags from form

    if (typeof tagsArray === 'string') {
        try {
            // Try parsing as JSON (handles cases where frontend sends JSON string)
            tagsArray = JSON.parse(tagsArray);
        } catch (error) {
            // If parsing fails, fallback to splitting by commas
            tagsArray = tagsArray.split(',').map(tag => tag.trim());
        }
    }

    req.body.post.tags = tagsArray; // Store as an actual array

    let newPost = new Post(req.body.post);
    newPost.owner = req.user._id;
    if(req.file){
        newPost.img = {
            url: req.file.path,
            filename: req.file.filename
         };
    }
    await newPost.save();
    console.log(newPost);
    req.flash("success", "New post created");
    res.redirect('/posts');
}));

// new post
router.get('/new',isLoggedIn, (req, res) => {
    res.render('posts/new');
});

// show a post
router.get('/:id', wrapAsync(async (req, res) => {
    let {id} = req.params;
    let post = await Post.findById(id)
        .populate({ path: 'answers', populate: { path: 'author' } })
        .populate({ path: 'owner' });
    res.render('posts/show', {post});
}));

// edit-post
router.get('/:id/edit',isLoggedIn, wrapAsync(async (req, res) => {
    let {id} = req.params;
    let post = await Post.findById(id);
    if(post.img){
        let originalUrl = post.img.url;
        originalUrl = originalUrl.replace("/upload", "/upload/w_250");
        return res.render('posts/edit', {post, originalUrl});
    }
    res.render('posts/edit', {post});    
}));

// update post
router.put('/:id',isLoggedIn,upload.single('post[img]'), validatePost, wrapAsync(async (req, res) => {
    let { id } = req.params;

    // Ensure tags are stored as an array
    let tagsArray = req.body.post.tags;
    if (typeof tagsArray === 'string') {
        try {
            tagsArray = JSON.parse(tagsArray); // If sent as a JSON string, parse it
        } catch (error) {
            tagsArray = tagsArray.split(',').map(tag => tag.trim()); // Fallback to comma-separated string
        }
    }

    req.body.post.tags = Array.isArray(tagsArray) ? tagsArray : []; // Ensure it's an array

    
    let editedPost = await Post.findById(id);

    if (req.file) {
        editedPost.img = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    editedPost = await Post.findByIdAndUpdate(id, { ...req.body.post, img: editedPost.img }, { new: true });

    req.flash("success", "Post Updated Successfully");
    res.redirect(`/posts/${id}`);
}));


// delete post
router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    let {id} = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    console.log(deletedPost);
    req.flash("error","Post deleted successfully");
    res.redirect('/posts');
}));

// UPvote
router.post("/:id/:userId/upVote", isLoggedIn, wrapAsync(async (req, res) => {
    let {id, userId} = req.params;
    let post = await Post.findById(id);
    
    if (!post) {
        req.flash("error", "Post not found");
        return res.redirect(req.get('Referrer') || "/posts/allPosts");
    }

    // Ensure post.votes is always an array
    post.votes = post.votes || [];

    // Check if the user has already upvoted
    let upvoted = post.votes.includes(userId);
    if (upvoted) {
        post.votes.pull(userId);  // Remove the user from the votes array if they've already voted
    } else {
        post.votes.push(userId);  // Add the user to the votes array if they haven't voted yet
    }

    await post.save();  // Save the updated post

    res.redirect(req.get('Referrer') || '/posts/allPosts');
}))



module.exports = router;