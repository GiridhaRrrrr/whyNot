let Answer = require("../models/answers.js");
let Post = require("../models/posts.js");


module.exports.newAnswer = async (req, res) => {    
    let { id } = req.params;
    let post = await Post.findById(id).populate('owner');
    res.render('answers/new', { post });
}

module.exports.postNewAnswer = async (req, res) => {
    let { id } = req.params;

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
        newAnswer.img = {
            url: req.file.path,
            filename: req.file.filename
         };
    }
    await newAnswer.save();
    await post.save();

    // console.log("New Answer with References:", newAnswer);
    
    req.flash("success", "Answer posted successfully");
    res.redirect(`/posts/${id}`);
}

module.exports.editAnswer = async (req, res) => {
    let { id, ansId } = req.params;
    let answer = await Answer.findById(ansId);
    if(answer.img.url){
        let originalUrl = answer.img.url;
        originalUrl = originalUrl.replace("/upload", "/upload/w_250");
        return res.render('answers/edit', { answer, id, originalUrl });
    }
    res.render('answers/edit', { answer, id });
    
}

module.exports.postEditedAnswer = async (req, res) => {
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
}

module.exports.deleteAnswer = async (req, res) => {
    let { id, ansId } = req.params;
    let deletedAnswer = await Answer.findByIdAndDelete(ansId);
    req.flash("success","Answer deleted Succesfully")
    res.redirect(`/posts/${id}`);       
}

module.exports.disLike = async (req, res) => {
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
}

module.exports.like = async (req, res) => {
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
}