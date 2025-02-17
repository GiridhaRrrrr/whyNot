const ExpressError = require("./ExpressError.js");
let {postSchema} = require("./joiSchema.js");
let {answerSchema} = require("./joiSchema.js");

module.exports.validatePost = (req, res, next) => {
    let {error} = postSchema.validate(req.body);
    if(error){
        throw new ExpressError(404, error);
    }
    else{
        next();
    }
};

module.exports.validateAnswer = (req, res, next) => {
    let {error} = answerSchema.validate(req.body);
    if(error){
        throw new ExpressError(404, error);
    }
    else{
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login Required");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.savedRedirecturl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}