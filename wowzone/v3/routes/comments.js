var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Screenshot = require("../models/screenshot");

router.get("/new", isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id, function(err, screenshot){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {screenshot: screenshot});
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;