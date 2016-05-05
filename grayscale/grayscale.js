// JS Worker handle messages from main script
self.onmessage = function(e) {
		// convert given rgb to grayscale value
		function grayScale(r,g,b) {
			return (0.299*r + 0.587*g + 0.114*b);
		}	
		// get data from message
    var arr = e.data.dataURL;
		
		for (var i=0; i<arr.length; i+=4) {
			//change rgb values to grayscale value
			var val = grayScale(arr[i], arr[i+1], arr[i+2]);
			arr[i] = val;
			arr[i+1] = val;
			arr[i+2] = val;
   }
	//post grayscale array
   postMessage(arr);
};
