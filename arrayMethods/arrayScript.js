 /*-------------------------------------------------------------------------
	 * arrayScript.js
	 * Patrick Roderman
	 * 
	 * arrayScript Objectives
	 *    1. Practice using Array iteration methods - e.g. reduce(),filter(),map()
	 *
	 ------------------------------------------------------------------------*/

(function(){
	"use strict";
	// Add two numbers
	function plus(a, b) { return a + b; };

	// Compute the average of an array
	function avg(arr)   {
	return arr.reduce(plus) / arr.length;
	}

	// Compute age
	function age(p)     { return p.died - p.born; }

	// Test for a male
	function male(p)    { return p.sex == "m"; }

	// Test for a female
	function female(p)  { return p.sex == "f"; }

	// Compute average age of male and female members
	var avg_male_age   = avg( ancestry.filter( male ).map( age ));
	var avg_female_age = avg( ancestry.filter( female ).map( age ));

	var males = (ancestry.filter( male ).map( age ));
	var females =(ancestry.filter( female ).map( age ));
	
	/** A general numerical filter,
	 *	@param(String) prop - property
	 *	@param(Array) arr - array
	 *	@param(Number) num 
	 *	@param(String) equality - equality string to filter by
	 */
	var numericalFilter = function(prop, arr, num, equality){
		return arr.filter(function(prop){
			
			if(equality === ">"){
				return (prop > num) ? true : false;
			}else if(equality === "<"){
				return (prop < num) ? true : false;		
			}else if(equality === "<="){
				return (prop <= num) ? true : false;
			}else if(equality === ">="){
				return (prop >= num) ? true : false;
			}else if (equality === "="){
				return (prop === 50) ? true : false;
			}else{
				console.log("numericalFilter equality params are invalid");
			}
		});
	};
	
	//returns array containing all numbers over 50
	var over50 = function(age, array){
		return array.filter(function(age){return (age > 50) ? true : false} );
	};
		
	//returns array containing all numbers under 50
	var under50 = function(age, array){
		return array.filter(function(age){return (age <= 50) ? true : false} );
	};

	var malesOverFifty = numericalFilter(age, males, 50, ">");
	var malesUnderFifty = numericalFilter(age, males, 50, "<=");
	
	var femalesOverFifty = numericalFilter(age, females, 50, ">");
	var femalesUnderFifty = numericalFilter(age, females, 50, "<=");
		
	/** Calculates standard deviation
	 *	@param(array) arr
	 *	@param(double) mean
	 */
	var stdev = function(arr, mean){
		var differences = arr.map(function(current){ return(current - mean)});
		var sum_square = differences.reduce( function(prev, diff){return (Math.pow(diff,2)) + prev;}, 0);
		var output = Math.sqrt(sum_square/(arr.length-1));
		return output;
	};
		
	//Console Logs
	//lengths
	console.log("men over 50: " + malesOverFifty.length,
				"\nmen under 50: " + malesUnderFifty.length,
				"\nfemale over 50: " + femalesOverFifty.length,
				"\nfemale under 50: " + femalesUnderFifty.length);
				
	//averages
	console.log('average male age: ' + avg_male_age,
				'\naverage female age: ' + avg_female_age);
	//standard deviations
	console.log('Male age Standard Deviation: ' + stdev(males, avg_male_age),
				'\nFemale age Standard Deviation: ' + stdev(females, avg_female_age));
})();