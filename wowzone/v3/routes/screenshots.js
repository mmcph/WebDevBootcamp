var express = require("express");
var router = express.Router();
var Screenshot = require("../models/screenshot");
var middleware = require("../middleware");

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

router.post("/", middleware.isLoggedIn, function(req, res){
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

router.get("/:id", function(req, res){
    Screenshot.findById(req.params.id).populate("comments").exec(function(err, specSS){
        if(err){
            console.log(err);
        } else {
            res.render("screenshots/show", {screenshot:specSS});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.checkScreenshotOwner, function(req, res){
    Screenshot.findById(req.params.id, function(err, foundScreenshot){
        res.render("screenshots/edit", {screenshot: foundScreenshot});
    });
});

//UPDATE
router.put("/:id", middleware.checkScreenshotOwner, function(req, res){
    Screenshot.findByIdAndUpdate(req.params.id, req.body.screenshot, function(err, updatedSS){
        if(err){
            res.redirect("/screenshots");
        } else {
            res.redirect("/screenshots/" + req.params.id);
        }
    });
});

//DELETE
router.delete("/:id", middleware.checkScreenshotOwner, function(req, res){
    Screenshot.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/screenshots");
        } else {
            res.redirect("/screenshots");
        }
    });
});

module.exports = router;