var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});
//register logic

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to WoWZone, " + user.username + ".");
            res.redirect("/screenshots");
        });
    });
});

//login routes

router.get("/login", function(req, res){
    res.render("login");
});

//login logic

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/screenshots",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out.");
    res.redirect("/screenshots");
});

module.exports = router;