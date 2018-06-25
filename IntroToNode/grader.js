
function average(arr) {
    var tot = 0;
    for(var i = 0; i < arr.length; i++){
        tot = tot + arr[i];
    }
    var avg = tot / arr.length;
    console.log("Average score: " + Math.floor(avg));
}

average([90, 92, 77, 88, 54, 99, 78, 66, 97]);