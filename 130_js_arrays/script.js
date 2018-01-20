var testarr = [1,2,3,4];
function printReverse(arr){
	for(i=arr.length; i>=0; i--){
		console.log(arr[i]);
	}
}

function isUniform(arr){
	for(i=0; i<arr.length; i++){
		if(arr[0] != arr[i]){
			return false;
		}
	}
	return true;
}

function sumArray(test){
	var sum = 0;
	for(i=0; i<test.length; i++){
		sum = sum + test[i];
	}
	return sum
}

function max(range){
	var max = range[0];
	for(i=0; i<range.length; i++){
		if(range[i] > max){
			max = range[i];
		}
	}
	return max;
}