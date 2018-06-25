var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment.");
});

app.get("/speak/:animal", function(req, res){
    var sound = "";
    if (req.params.animal==="pig"){
        sound="oink";
    }
    if (req.params.animal==="cow"){
        sound="moo";
    }
    if (req.params.animal==="duck"){
        sound="quack";
    }
    res.send("The "+req.params.animal+" says "+sound+".");
});

app.get("/repeat/:word/:num", function(req, res){

    var count = parseInt(req.params.num, 10);
    var s = "";
    for(var i=0; i<count; i++){
       var s = s+req.params.word+" ";
    }
    res.send(s);
});

app.get("*", function(req, res){
        res.send("404");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});