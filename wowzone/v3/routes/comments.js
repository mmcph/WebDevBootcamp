var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Screenshot = require("../models/screenshot");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id, function(err, screenshot){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {screenshot: screenshot});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Screenshot.findById(req.params.id, function(err, screenshot){
        if(err){
            console.log(err);
            res.redirect("/screenshots");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username & id
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    screenshot.comments.push(comment);
                    screenshot.save();
                    res.redirect("/screenshots/" + screenshot._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {screenshot_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/screenshots/" + req.params.id);
        }
    });
});

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;