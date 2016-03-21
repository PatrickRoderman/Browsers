 /*-------------------------------------------------------------------------
	 * project2.js
	 * Patrick Roderman
	 * 
	 * Project 2 Objectives
	 *    1. Practice using SVGs, the window's timing functions, and misc. element manipulation
	 *
	 ------------------------------------------------------------------------*/

;(function(){
	// builds svg squares in a grid and appends to body
	var buildSVGTable = function(){	
		var text = document.createElement("h1");
		text.innerHTML = "Color Matching Game";
		text.setAttribute("style", "text-align : center; display: block; margin: auto;");
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttributeNS(null,'style', 'margin: auto; display: block; border: 1px solid black; margin-top: 50px');
		svg.setAttributeNS(null,'width', '500');
		svg.setAttributeNS(null,'height', '500');
		svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		document.body.appendChild(text);
		document.body.appendChild(svg);
		
		var counter = 0;
		var yMulti = -50;
		
		//create boxes as a grid
		for(var i = 0; i < 100; i++){
		
			var tempEle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			tempEle.setAttributeNS(null, 'width', '50');
			tempEle.setAttributeNS(null, 'height', '50');
			tempEle.setAttributeNS(null, 'fill', 'white');
			tempEle.setAttributeNS(null, 'stroke', 'black');
			tempEle.setAttributeNS(null, 'class', 'box');
			tempEle.setAttributeNS(null, 'data-index-number', i);
		
			if(counter % 10 === 0){
				yMulti += 50;
				counter = 0;
			}
		tempEle.setAttributeNS(null, 'y', yMulti);
		tempEle.setAttributeNS(null,'x', counter*50);
			svg.appendChild(tempEle);
			counter++;
		}
	}
	
	// Event listener function for box click logic
	function boxEvent(){
		
		clickCounter++;
		clearTimeout(timeoutID);
		
		//clear boxes that have failed
		if(clickCounter % 2 !== 0 && historyQueue.length > 0){
			historyQueue.pop().setAttributeNS(null, "fill", "white");
			historyQueue.pop().setAttributeNS(null, "fill", "white");
		}
		
		var currentBox = this;
		
		//set color
		currentBox.setAttributeNS(null, "fill", colors[currentBox.getAttributeNS(null,"data-index-number")]);
		
		//on first click, set first selection 
		if(clickCounter % 2 !== 0){
			selection = this;
		}
		//on second click
		if(clickCounter % 2 === 0){
			//if the same box is clicked, do not count
			if(selection.getAttributeNS(null,"data-index-number") === currentBox.getAttributeNS(null,"data-index-number")){
				clickCounter--;
			}else{
				if(colors[selection.getAttributeNS(null,"data-index-number")] === colors[currentBox.getAttributeNS(null,"data-index-number")]){
					// if colors match remove listeners for both elements
					selection.removeEventListener('click', boxEvent, false);
					currentBox.removeEventListener('click', boxEvent, false);
					winCounter++;
					// win condition
					if(winCounter===50){
						alert("Congratulations!");
					}
				}else{
					//push selections to historyQueue
					historyQueue.push(currentBox);
					historyQueue.push(selection);
					
					//timeout to set bg color to white
					timeoutID = setTimeout(function(){ 
						currentBox.setAttributeNS(null, "fill", "white");
						selection.setAttributeNS(null, "fill", "white");
					},500);
				}
			}
		}
	}
	
	//returns a shuffled array of 5 evenly distributed colors
	function createColorArray(){
		function shuffleArray(pool){
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
		var arr = [];
		//create array with evenly distributed colors
		for(var i = 0; i < 100; i++){
			if(i<20){arr.push("red");}
			if(i>=20 && i<40){arr.push("green");}
			if(i>= 40 && i<60){arr.push("yellow");}
			if(i>=60 && i<80){arr.push("blue");}
			if(i>=80 && i<100){arr.push("cyan");}			
		}
		return shuffleArray(arr);
	}
	
	//array of boxes
	var boxes = document.getElementsByClassName("box");
	
	//win state counter
	var winCounter = 0;
	
	//counter for clicks
	var clickCounter = 0;
	
	// id for setTimeOut() used
	var timeoutID;
	
	//first box clicked
	var selection;
	
	//create array of colors for boxes
	var colors = createColorArray();
	
	//history of clicks
	var historyQueue = [];
	
	//creates the svg boxes
	buildSVGTable();
	
	//add listeners to each box
	for (var i = 0; i < boxes.length; i++) {
			boxes[i].addEventListener('click', boxEvent, false);
	}
	
})();