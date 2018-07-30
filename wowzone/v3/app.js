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

var commentRoutes = require("./routes.comments");
var screenshotRoutes = require("./routes.screenshots");
var indexRoutes = require("./routes.index");

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

app.use(indexRoutes);
app.use(screenshotRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("WoWZone server started.");
});