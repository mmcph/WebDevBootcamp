var express = require("express");
var router = express.Router();
var Screenshot = require("../models/screenshot");

router.get("/", function(req, res){
    Screenshot.find({}, function(err, allScreenshots){
        if(err){
            console.log(err);
        } else {
            res.render("screenshots/index", {screenshots:allScreenshots});
        }
    });
});

router.get("/new", function(req, res){
   res.render("screenshots/new"); 
});

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newScreen = {name: name, image: image, description: description, author: author};
    Screenshot.create(newScreen, function(err, newSS){
        if(err){
            console.log(err);
        } else {
            res.redirect("/screenshots");
        }
    });
});

router.get("/:id", isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id).populate("comments").exec(function(err, specSS){
        if(err){
            console.log(err);
        } else {
            res.render("screenshots/show", {screenshot:specSS});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;