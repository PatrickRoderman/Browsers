 /*-------------------------------------------------------------------------
	 * lab2.js
	 * Patrick Roderman
	 * 
	 * Lab 1 Objectives
	 *    1. Add value checking to previous lab
	 *    
	 * 	Contents: 4 Calculations using user input through prompt();
	 ------------------------------------------------------------------------*/

//Part 1
//Calculations 1 & 3 with checks

//CALCULATION 1
var calc1 = function(){
//assign prompt input to vars
	var a = testPrompt("Enter a number", 1);
	var b = testPrompt("Enter another number", 1);
	
	//calculation
	var c = Math.sqrt((a*a) + (b*b));
  //alert calculation
	alert(c);
};

//CALCULATION 3
var calc3 = function(){

	//assign comma delimited string
	var stringOfValues = testPrompt("Enter comma-delimited string of values" ,3);
	
	alert(stringOfValues);

};

//input validation function
//calcNumber - corrisponds to calculation number
var testPrompt = function(promptString, calcNumber){
	
	if(calcNumber === 1){
		var complete = false;
		while(!complete){
			var a = prompt(promptString);
			
			//Test prompt input
			if(Number.isNaN(Number(a))){
				alert("You cannot entered NaN.")
			}else if(a<0){
				complete = true;
			}else if(a === null){
				return;
			}else if(typeof parseFloat(a) === "number"){
				return a;
			}else{
				alert("You entered invalid input");
			}
		}
	}else if(calcNumber === 3){
	
		complete = false;
		while(!complete){
					
			var stringOfValues = prompt(promptString);
			
			if(stringOfValues === null){
				return;
			}
			
			//array from comma delimited terms
			var arrayOfValues = stringOfValues.split(",");

			if(arrayOfValues.length < 2){
				alert("You need to enter more than two values");
				
			}else{
				//join array into a string, each seperated by ;
				var newStringOfValues = arrayOfValues.join(";");
				complete = true;
			}
			
			
		}
		return newStringOfValues;
		
	}
}

//calls
calc1();
calc3();


//Part 2
//Factory function (closure)

 var makeCounter = function() {
	var count = 0;
	//adds n to count
	var addCount = function(n){
		count += n;
	}
	//returns count
	var getCount = function(){
		return count;
	}
	
	//object for both functions 
	var counter = {
		addCount : addCount,
		getCount : getCount
	}
	return counter;
} 
var counter = makeCounter(); 
// Tests 

console.log( counter.getCount() );  // 0 
counter.addCount(1); 
console.log( counter.getCount() );  // 1 
counter.addCount(2); 
console.log( counter.getCount() );  // 3


