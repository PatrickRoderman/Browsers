 /*-------------------------------------------------------------------------
	 * project1.js
	 * Patrick Roderman
	 * 
	 * Project 1 Objectives 
	 *	1) Simulate the Monty Hall Problem in JS
	 * 	Contents:
	 *		Runs a simulation demonstrating the solution to the Monty Hall 
	 *		problem - as a contestant, it is always to your 
	 *		advantage to switch your original door choice. It demonstrates
	 *		that contestants who switch have a 2/3 chance of winning the car
	------------------------------------------------------------------------*/
	
var simulate = function(numberOfTrials){
	var trials = numberOfTrials;
	var nstay = 0, nswitch = 0;
	
	var play = function(){
		
		//all possibilities
		var doors = ["goat", "goat", "car"];
		//Shuffle the order of the array
		doors = shuffleArray(doors);
		//create a random index for the array
		var randomIndex = Math.floor(Math.random()*2);
		//store the random index of the array as a psuedo selection
		var originalSelection = doors[randomIndex];
			
		var goatIndex, otherIndex;
		
		//assign the index for the goat 
		for(var a = 0; a<3; a++){
			
			if(a !== randomIndex){
				//of the chosen index
				if(typeof goatIndex !== 'undefined'){
					
					otherIndex = a;
					
				} else if(doors[a] === "goat"){
					
					goatIndex = a;
				}
			}
		}
		
		if(originalSelection === "car"){
			nstay++;
		}else if(originalSelection === "goat"){
			nswitch++;
		}
	}
	
	//Invoke play() to numberofTrials
	for(var i = 0; i < numberOfTrials; i++){
		play();
	}
	
	//Console log the final stats for stay/switch
	console.log("Final stats: ");
	console.log( "Stay " + nstay + "/" + numberOfTrials + " = " + (nstay/numberOfTrials));
	console.log("Switch " + nswitch + "/" + numberOfTrials + " = " + (nswitch/numberOfTrials));

}

/**
 * Randomly Shuffles an array
 * @param {array} pool 
 * @return {array} shuffledArray
 */
var shuffleArray = function(pool){
	var shuffledArray = pool;
	var randomIndex;
	var currentIndex = shuffledArray.length;
	var temp;
	while( currentIndex !== 0){
		
		//get random index for assigning value
		randomIndex = Math.floor(Math.random()*currentIndex);
		currentIndex -= 1;
		
		//swap the values using temp
		temp = shuffledArray[currentIndex];
		shuffledArray[currentIndex] = shuffledArray[randomIndex];
		shuffledArray[randomIndex] = temp;
		
	}
	return shuffledArray;
}

simulate(100000);
