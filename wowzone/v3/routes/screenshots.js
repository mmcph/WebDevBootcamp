var express = require("express");
var router = express.Router();
var Screenshot = require("../models/screenshot");

router.get("/screenshots", function(req, res){
    Screenshot.find({}, function(err, allScreenshots){
        if(err){
            console.log(err);
        } else {
            res.render("screenshots/index", {screenshots:allScreenshots});
        }
    });
});

router.get("/screenshots/new", function(req, res){
   res.render("screenshots/new"); 
});

router.post("/screenshots", function(req, res){
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

router.get("/screenshots/:id", function(req, res){
    Screenshot.findById(req.params.id).populate("comments").exec(function(err, specSS){
        if(err){
            console.log(err);
        } else {
            console.log(specSS);
            res.render("screenshots/show", {screenshot:specSS});
        }
    });
});

module.exports = router;