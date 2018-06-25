var express = require("express");
var app = express();
var request = require("request");
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("search.ejs");
});


app.get("/search", function(req, res){
    var term = req.query.searchTerm;
    var url = 'http://www.omdbapi.com/?s=' + term + '&apikey=thewdb'
    request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
        
        var parsedData = JSON.parse(body);

        res.render("results.ejs", {parsedData: parsedData});
    } else {
        console.log(error);
    }
    });
});

app.get("/github", function(req, res){
    var options = {
        url: "https://api.github.com/users/mmcph/repos",
        headers: {
            "User-Agent": "mmcph"
        }
    };
    request(options, function(error, response, body){
        var gitData = JSON.parse(body);

        res.render("github.ejs", {gitData: gitData});
    });
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});