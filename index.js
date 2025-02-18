if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const session=require("express-session")
const flash=require("connect-flash")


// passport-local
let passport = require("./passport-config.js");


// models
let User = require('./models/users.js')

// Error-Handler
let ExpressError = require("./utils/ExpressError.js")

// routes
let postRoutes = require("./routes/posts.js")
let answerRoutes = require("./routes/answers.js")
let userRoutes = require("./routes/users.js")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( {extended : true} ));
app.use(express.json());
app.use(methodOverride('_method'));


main()
.then(()=>{
    console.log("connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whyNot');
}

// sessions
const sessionOptions={
    secret:"helloSecreat",
    resave:false,
    saveUninitialized: true,
    cookie:{//==>used to store our expire date which is by default set to  null 
      expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,//==>(7days,24hours,60mins,60sec,1000 milli secs)
      maxAge:7 * 24 * 60 * 60 * 1000,
      httpOnly:true, 
    },
  } ;

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    if(req.user){
        res.locals.currUser = req.user.username;
        res.locals.currUserId = req.user._id;        
    }
    else{
        res.locals.currUser = "";
        res.locals.currUserId = "";
    }
    return next();
});

app.get('/', (req, res) => {
    res.render('explore');
});

//  users
app.use("/user", userRoutes);

// post Routes
app.use("/posts", postRoutes);
 
// answer Routes
app.use("/posts/:id/answer", answerRoutes);



app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Entered a Wrong Route! Page not found"));
});

app.use((err, req, res, next)=>{ 
    let {status = 500, message = "Something Went Wrong"} = err;
    // if(err.name === "ValidationError"){
    //     message = "It's a Mongoose schema error. Follow schema rules.";
    // }
    // res.send(message); 
    res.render("posts/error", {message});
})
  
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
