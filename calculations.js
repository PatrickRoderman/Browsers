
 /*-------------------------------------------------------------------------
	 * lab1.js
	 * Patrick Roderman
	 * 
	 * Lab 1 Objectives
	 *    1. Practice using JavaScript operators and global objects.
	 *    2. Practice using the FireFox development tools, including Scratchpad editor.
	 *
	 * 	Contents: 4 Calculations using user input through prompt();
	 ------------------------------------------------------------------------*/
	 
//function calls for each calculation
calculation1();
calculation2();
calculation3();
calculation4();

//CALCULATION 1
function calculation1(){

	//assign prompt input to vars
	var a = prompt("Enter a number");
	var b = prompt("Enter another number");

	//calculation
	var c = Math.sqrt((a*a) + (b*b));

	//alert calculation
	alert(c);

}

//CALCULATION 2
function calculation2(){

	//assign prompt input to var
	var seconds = prompt("Enter total seconds as integer");
	//ensure value is int
	seconds = parseInt(seconds);

	var hours, minutes;

	//find nearesst whole minutes
	minutes = Math.floor(seconds/60);
	//find nearest whole hours
	hours = Math.floor(minutes/60);
	//find remainder minutes
	minutes = minutes%60;
	//find the remainder seconds
	seconds = seconds%60;

	//alert formated string of hrs/mins/secs
	alert(hours + " hours " + minutes + " minutes " + seconds + " seconds");

}

//CALCULATION 3
function calculation3(){

//assign comma delimited string
var stringOfValues = prompt("Enter comma-delimited string of values");

//array from comma delimited terms
var arrayOfValues = stringOfValues.split(",");

//join array into a string, each seperated by ;
var newStringOfValues = arrayOfValues.join(";");

//alert new value
alert(newStringOfValues);

}

//CALCULATION 4
function calculation4(){

//store user inputed date
var date = prompt("Enter Date");

//parse date into milliseconds
 date = Date.parse(date);

//add a days worth of milliseconds to date
 date += 8.64e+7;
 
//create a new date with the milliseconds-formatted date
var newDate = new Date(date);
//var with the milliseconds into a string
var anotherDate = newDate.toDateString();
//alert the new string
alert(anotherDate);

}
