var age = prompt("How old are you?");
if (age < 0){
	console.log("Quit being ridiculous.");
}
if (age == 21){
	console.log("Happy 21st birthday!");
}
if ((age % 2) > 0){
	console.log("Your age is odd.");
}
var squareRoot = Math.sqrt(age);
var sqrtFloor = Math.floor(squareRoot);
if (age == (sqrtFloor*sqrtFloor)){
	console.log("Your age is a perfect square.");
}