var movies = [
	{
		title: "300", 
		rating: "4 stars", 
		hasWatched:true
	},
	{
		title: "Hot Fuzz", 
		rating: "5 stars", 
		hasWatched:true
	},
	{
		title: "50 Shade of Gray", 
		rating: "Dreck", 
		hasWatched:false
	}
]
function readout(){
	for(var i=0; i<movies.length; i++){
		if (movies[i].hasWatched==true){
			console.log("You have watched " + movies[i].title + " - " + movies[i].rating);
		}
		else{
			console.log("You have not watched " + movies[i].title + " - " + movies[i].rating);
		}
	}
}
readout();