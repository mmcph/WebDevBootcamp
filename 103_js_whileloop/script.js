var numOne = -10;
while (numOne<=19){
	console.log(numOne);
	numOne++;
}
console.log("-----");
var numTwo = 8;
while (numTwo<40){
	console.log(numTwo+2);
	numTwo+=2;
}
console.log("-----");
var numThree = 300;
while (numThree<=333){
	if ((numThree % 2) != 0){
		console.log(numThree);
	}
	numThree++;
}
console.log("-----");
var numFour = 5;
while (numFour<50){
	if (numFour % 3 == 0 && numFour % 5 == 0){
		console.log(numFour);
	}
	numFour++;
}