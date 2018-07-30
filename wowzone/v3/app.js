var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var mongoose = require("mongoose");
var Screenshot = require("./models/screenshot");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");

mongoose.connect("mongodb://localhost/wowzone");
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "You wouldn't guess this in a million years, chump.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//   var screenshots = [
//         {name: "Elwynn Forest", image: "https://i.ytimg.com/vi/uvW-QTiZLQ0/maxresdefault.jpg"},
//         {name: "Westfall", image: "http://1.bp.blogspot.com/_ZnN8mGFKQxQ/TFm1xzO6BFI/AAAAAAAAAc4/VTNcnyvn7gA/s1600/intro.jpg"},
//         {name: "Redridge Mountains", image: "http://3.bp.blogspot.com/_Hq85NykjWyw/TOrj4VjidKI/AAAAAAAAAu4/cIUX6I9T_Eo/s1600/redridgemountains_05.jpg"},
//         {name: "Duskwood", image: "https://i.ytimg.com/vi/DlS2rOlNV_0/maxresdefault.jpg"}
//       ];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/screenshots", function(req, res){
    Screenshot.find({}, function(err, allScreenshots){
        if(err){
            console.log(err);
        } else {
            res.render("screenshots/index", {screenshots:allScreenshots, currentUser: req.user});
        }
    });
});

app.get("/screenshots/new", function(req, res){
   res.render("screenshots/new"); 
});

app.post("/screenshots", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var descr = req.body.descr;
    var newScreen = {name: name, image: image, descr: descr};
    Screenshot.create(newScreen, function(err, newSS){
        if(err){
            console.log(err);
        } else {
            res.redirect("/screenshots");
        }
    });
});

app.get("/screenshots/:id", function(req, res){
    Screenshot.findById(req.params.id).populate("comments").exec(function(err, specSS){
        if(err){
            console.log(err);
        } else {
            console.log(specSS);
            res.render("screenshots/show", {screenshot:specSS});
        }
    });
});

//=======COMMENTS========

app.get("/screenshots/:id/comments/new", isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id, function(err, screenshot){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {screenshot: screenshot});
        }
    });
});

app.post("/screenshots/:id", isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id, function(err, screenshot){
        if(err){
            console.log(err);
            res.redirect("/screenshots");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    screenshot.comments.push(comment);
                    screenshot.save();
                    res.redirect("/screenshots/" + screenshot._id);
                }
            });
        }
    });
});

//Auth Routes
//register

app.get("/register", function(req, res){
    res.render("register");
});
//register logic

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/screenshots");
        });
    });
})

//login routes

app.get("/login", function(req, res){
    res.render("login");
});

//login logic

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/screenshots",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/screenshots");
});

//middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("WoWZone server started.");
});