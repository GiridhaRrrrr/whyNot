const express = require('express');
const router = express.Router({ mergeParams: true });
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

let wrapAsync = require("../utils/wrapAsyncFunction.js");
let Answer = require("../models/answers.js");
let Post = require("../models/posts.js");
const { isLoggedIn, validateAnswer} = require('../utils/middleware.js');

// new answer
router.get('/',isLoggedIn, wrapAsync(async (req, res) => {    
    let { id } = req.params;
    let post = await Post.findById(id).populate('owner');
    res.render('answers/new', { post });
}));

// create answer
router.post('/',isLoggedIn,upload.single("answer[img]"), validateAnswer, wrapAsync(async (req, res) => {
    let { id } = req.params;

    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
    }

    let post = await Post.findById(id);
    if (!post) {
        req.flash("error", "Post not found!");
        return res.redirect('/posts');
    }

    // Ensure reference is stored as an array
    let referenceArray = req.body.answer.reference;

    if (typeof referenceArray === 'string') {
        try {
            referenceArray = JSON.parse(referenceArray); // Parse JSON if it was stored as a string
        } catch (error) {
            referenceArray = referenceArray.split(',').map(ref => ref.trim()); // Fallback: Convert comma-separated string to array
        }
    }

    req.body.answer.reference = Array.isArray(referenceArray) ? referenceArray : []; // Ensure it's always an array

    let newAnswer = new Answer(req.body.answer);
    newAnswer.author = req.user._id;
    post.answers.push(newAnswer);
    if(req.file){
        newAnswer.img = {url, filename};
    }
    await newAnswer.save();
    await post.save();

    console.log("New Answer with References:", newAnswer);
    
    req.flash("success", "Answer posted successfully");
    res.redirect(`/posts/${id}`);
}));



// edit answer
router.get('/:ansId',isLoggedIn, wrapAsync(async (req, res) => {
    let { id, ansId } = req.params;
    let answer = await Answer.findById(ansId);
    if(answer.img.url){
        let originalUrl = answer.img.url;
        originalUrl = originalUrl.replace("/upload", "/upload/w_250");
    }
    res.render('answers/edit', { answer, id, originalUrl });
}));

// update answer
router.put('/:ansId',isLoggedIn, upload.single("answer[img]"), validateAnswer, wrapAsync(async (req, res) => {
    let { id, ansId } = req.params;

    // Ensure reference is stored as an array
    let referenceArray = req.body.answer.reference;

    if (typeof referenceArray === 'string') {
        try {
            referenceArray = JSON.parse(referenceArray); // If it's a JSON-encoded string, parse it
        } catch (error) {
            referenceArray = referenceArray.split(',').map(ref => ref.trim()); // Fallback: Convert comma-separated string
        }
    }

    // Ensure it's a valid array of strings (remove nulls/invalid values)
    req.body.answer.reference = Array.isArray(referenceArray)
        ? referenceArray.filter(ref => typeof ref === 'string' && ref.trim() !== '')
        : [];

    let edited = await Answer.findById(ansId);
    if(req.file)  {
        edited.img = {
            url: req.file.path,
            filename:  req.file.filename,
        }
    }  

    let editedAnswer = await Answer.findByIdAndUpdate(ansId, { ...req.body.answer, img: edited.img }, { new: true });

    res.redirect(`/posts/${id}`);
}));


// delete answer
router.delete('/:ansId',isLoggedIn, wrapAsync(async (req, res) => {
    let { id, ansId } = req.params;
    let deletedAnswer = await Answer.findByIdAndDelete(ansId);
    req.flash("success","Answer deleted Succesfully")
    res.redirect(`/posts/${id}`);       
}));

// dislike answer
router.post("/:ansId/:userId/disLike", isLoggedIn, wrapAsync(async (req, res) => {
    let {ansId, userId} = req.params;
    let answer = await Answer.findById(ansId);

    if(!answer){
        req.flash("error", "Answer not found");
        return res.redirect(req.get('Referrer') || "/posts/allPosts");
    }

    let liked = answer.votes.includes(userId);
    if(liked){
        answer.votes.pull(userId);
    }
    await answer.save();
    res.redirect(req.get('Referrer') || '/posts/allPosts');
}));

router.post("/:ansId/:userId/like", isLoggedIn, wrapAsync(async (req, res) => {
    let {ansId, userId} = req.params;
    let answer = await Answer.findById(ansId);

    if(!answer){
        req.flash("error", "Answer not found");
        return res.redirect(req.get('Referrer') || "/posts/allPosts");
    }

    let liked = answer.votes.includes(userId);
    if(!liked){
        answer.votes.push(userId);
        await answer.save();
    }

    res.redirect(req.get('Referrer') || '/posts/allPosts');
}));


module.exports = router;