var express = require("express");
var app = express();
var bodyParser = require("body-parser");

   var screenshots = [
        {name: "Elwynn Forest", image: "https://i.ytimg.com/vi/uvW-QTiZLQ0/maxresdefault.jpg"},
        {name: "Westfall", image: "http://1.bp.blogspot.com/_ZnN8mGFKQxQ/TFm1xzO6BFI/AAAAAAAAAc4/VTNcnyvn7gA/s1600/intro.jpg"},
        {name: "Redridge Mountains", image: "http://3.bp.blogspot.com/_Hq85NykjWyw/TOrj4VjidKI/AAAAAAAAAu4/cIUX6I9T_Eo/s1600/redridgemountains_05.jpg"},
        {name: "Duskwood", image: "https://i.ytimg.com/vi/DlS2rOlNV_0/maxresdefault.jpg"}
       ];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/screenshots", function(req, res){
       res.render("screenshots", {screenshots:screenshots});
});

app.get("/screenshots/new", function(req, res){
   res.render("new"); 
});

app.post("/screenshots", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newScreen = {name: name, image: image};
    screenshots.push(newScreen);
    res.redirect("/screenshots");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("WoWZone server started.");
});