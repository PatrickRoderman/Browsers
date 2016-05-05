 /*-------------------------------------------------------------------------
	 * canvas.js
	 * Patrick Roderman
	 * 
	 * canvas Objectives
	 * 		-use canvas to draw a n-sided star at your mouse on click
	 * 		
	 ------------------------------------------------------------------------*/
;(function(canvasID){
	var c = document.getElementById(canvasID);
	var ctx = c.getContext("2d");
	
	//mouse listener
	c.addEventListener("mousedown", function(evt){
		var mousePos = getMousePos(c, evt);
	
		//return mouse coords
		function getMousePos(cvs, evt) { 
			var rect = cvs.getBoundingClientRect(); 
			return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }; 
		}
		//draw star
		drawStar(mousePos.x, mousePos.y, 50, 5, ctx);
	});
	
	/* draws a star from your mouse coords
	 * @params	cx	mouse x coord
	 * @params	cy	mouse y coord
	 * @params	radius	radius of star
	 * @params	npoints	number if points on the star
	 * @params	ctx	canvas context
	 */
	function drawStar(cx, cy, radius, npoints, ctx){
		
		var delta = Math.PI*2/(2*npoints);
		var theta = -Math.PI/2;
		var r = radius;
		var x, y;
			
		ctx.beginPath();
			
		x = r*Math.cos(theta) + cx;
		y = r*Math.sin(theta) + cy;
		ctx.lineTo(x,y);
		
		for(var i = 0; i<2*npoints; i++){
			theta += delta;
			if(i % 2 === 0){
				r = .5*radius;
			}else{
				r = radius;
			}
			x = r*Math.cos(theta) + cx;
			y = r*Math.sin(theta) + cy;
			
			ctx.lineTo(x,y);
		}
		
		ctx.fillStyle = "#FFFF00";
		ctx.strokeStyle = "#000000";
		ctx.stroke();
		ctx.fill();
						
		ctx.closePath();
				
	}
})("canvas");		
			