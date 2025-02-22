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
let postController = require("../controllers/posts.js");

// AllPosts
router.get('/', wrapAsync(postController.allPosts));

// create a post
router.post('/',isLoggedIn,upload.single('post[img]'), validatePost, wrapAsync(postController.CreateNewPost));

// new post
router.get('/new',isLoggedIn, (req, res) => {
    res.render('posts/new');
});

// show a post
router.get('/:id', wrapAsync(postController.showPost));

// edit-post
router.get('/:id/edit',isLoggedIn, wrapAsync(postController.editPost));

// update post
router.put('/:id',isLoggedIn,upload.single('post[img]'), validatePost, wrapAsync(postController.updatePost));


// delete post
router.delete('/:id', isLoggedIn, wrapAsync(postController.deletePost));

// UPvote
router.post("/:id/:userId/upVote", isLoggedIn, wrapAsync(postController.upVote))



module.exports = router;