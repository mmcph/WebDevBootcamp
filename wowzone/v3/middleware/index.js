var Screenshot = require("../models/screenshot.js");
var Comment = require("../models/comment.js");

var middlewareObj = {}

middlewareObj.checkScreenshotOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Screenshot.findById(req.params.id, function(err, foundScreenshot){
            if(err){
                res.redirect("back");
            } else {
                if(foundScreenshot.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to alter this screenshot.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that.")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to alter this comment.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj