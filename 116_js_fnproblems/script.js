function isEven(num){
	if(num % 2 == 0){
		return("true");
	}
	else{
		return("false");
	}
}
console.log(isEven(2));
console.log(isEven(3));

function factorial(i){
	if(i==0){
		return(1);
	}
	var fact = i;
	while(i>1){
		var fact = (fact * (i-1));
		i--;
	}
	return(fact);
}
console.log("FACTORIAL: 5! = " + factorial(5));
console.log("FACTORIAL: 10! = " + factorial(10));

function kebabToSnake(input){
	var newstr = "";
	for(i=0; i<input.length; i++){
		if(input[i] === "-"){
			var newstr = newstr + "_";
		}
		else{
			var newstr = newstr + input[i];
		}
	}
	return (newstr);
}
console.log("kebabToSnake(example-1) will return " + kebabToSnake("example-1"))