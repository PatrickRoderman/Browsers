 /*-------------------------------------------------------------------------
	 * fragments.js
	 * Patrick Roderman
	 * 
	 * fragments Objectives
	 * 		Write and test a JavaScript function that asynchronously loads an 
	 *		Array of at least three HTML fragment files, in order. The function 
	 *		should add the contents of each file to the page. Use an 
	 * 		XMLHttpRequest object to load each HTML fragment file
	 * 		
	 ------------------------------------------------------------------------*/
;(function(){
	//document paths
	var files = ["frag1.html", "frag2.html", "frag3.html"];

	//requests each fragment and appends to html recursively
	var loadFiles = function(files){
		
		//recursion base case
		if(files.length < 1){return;}
		
		//nexxt file path
		var file = files.pop();
		var xhr = new XMLHttpRequest(); 
				
		xhr.onload = function(){
			setTimeout( function() { 
				var allElements = xhr.response;
				//append html string to document's body innerHTML
				document.body.innerHTML += allElements;
				//recursively call on the file array
				return loadFiles(files);
				
			}, 0);
		}
		
		xhr.responseType = "text";
		xhr.open("GET", file);
		xhr.send();
		
	}
	
	loadFiles(files);

})();	