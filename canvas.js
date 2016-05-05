 /*-------------------------------------------------------------------------
	 * canvas2.js
	 * Patrick Roderman
	 * 
	 * canvas2 Objectives
	 * 		Create JS objects to draw specific shapes on canvas
	 * 		
	 ------------------------------------------------------------------------*/

;(function(){
	
	//create canvas
	var canvas = document.createElement("canvas");
	canvas.height = 500;
	canvas.width = 500;
	
	//append to body
	document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");
	//Shape Constructor
	var Shape = function(){
		//set default shape properties
		this.fillStyle = "red";
		this.strokeStyle = "black";
		this.lineWidth = 2;
		
	}
	//Draws the shape on the canvas
	Shape.prototype.draw = function(ctx){
		this.trace();
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
		ctx.lineWidth = this.lineWidth;
		if(this.strokeStyle !== undefined){
			ctx.stroke();
		} 
		if(this.fillStyle !== undefined){
			ctx.fill();
		} 		
	}	

	//Line Constructor 
	var Line = function(x1, y1, x2, y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		Shape.call(this);
	}
	Line.prototype = Object.create(Shape.prototype);
	//define line path
	Line.prototype.trace = function(){
		ctx.beginPath();
		ctx.moveTo(this.x1,this.y1);
		ctx.lineTo(this.x2,this.y2);

	}

	//Rectangle Consstructor
	var Rectangle = function(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		Shape.call(this);
	}
	Rectangle.prototype = Object.create(Shape.prototype);
	//define rectangle path
	Rectangle.prototype.trace = function(){
		ctx.rect(this.x, this.y, this.w, this.h);
	}
	
	//Ellipse Constructor 
	var Ellipse = function(cx, cy, rx, ry){
		this.cx = cx;
		this.cy = cy;
		this.rx = rx;
		this.ry = ry;
		Shape.call(this);
	}
	Ellipse.prototype = Object.create(Shape.prototype);
	//define ellipse path
	Ellipse.prototype.trace = function(){
		ctx.save();
		ctx.translate(this.cx, this.cy);
    ctx.scale(this.rx, this.ry);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, 2*Math.PI, false);
		ctx.restore();
	}
	
	//Polygon Constructor 
	var Polygon = function(cx, cy, radius, npoints){
		Shape.call(this);
		this.cx = cx;
		this.cy = cy;
		this.radius = radius;
		this.npoints = npoints;
	}
	Polygon.prototype = Object.create(Shape.prototype);
	//define polygon path
	Polygon.prototype.trace = function(){
		var delta = Math.PI*2/(this.npoints);
		var theta = -Math.PI/2;
		var r = this.radius;
		var x, y;
			
		ctx.beginPath();
		x = r*Math.cos(theta) + this.cx;
		y = r*Math.sin(theta) + this.cy;
		ctx.lineTo(x,y);
		
		for(var i = 0; i<this.npoints; i++){
			theta += delta;
			r = this.radius;
			x = r*Math.cos(theta) + this.cx;
			y = r*Math.sin(theta) + this.cy;
			
			ctx.lineTo(x,y);
		}
		ctx.closePath();
	}
	
	//Star Constructor 
	var Star = function(cx, cy, radius, npoints){
		Shape.call(this);
		this.cx = cx;
		this.cy = cy;
		this.radius = radius;
		this.npoints = npoints;
	}
	Star.prototype = Object.create(Shape.prototype);
	//define star path
	Star.prototype.trace = function(){
		var delta = Math.PI*2/(2*this.npoints);
		var theta = -Math.PI/2;
		var r = this.radius;
		var x, y;
			
		ctx.beginPath();
			
		x = r*Math.cos(theta) + this.cx;
		y = r*Math.sin(theta) + this.cy;
		ctx.lineTo(x,y);
		
		for(var i = 0; i<2*this.npoints; i++){
			theta += delta;
			if(i % 2 === 0){
				r = .5*this.radius;
			}else{
				r = this.radius;
			}
			x = r*Math.cos(theta) + this.cx;
			y = r*Math.sin(theta) + this.cy;
			
			ctx.lineTo(x,y);
		}
					
		ctx.closePath();
	}

	//Tests 
	var line = new Line(100,70,500,200);
	var rectangle = new Rectangle(50,50,50,50);
	var ellipse = new Ellipse(400,100,50,100);
	var poly = new Polygon(255,100,50,5);
	var star = new Star(200,200,50,5);
	
	line.draw(ctx);
	rectangle.draw(ctx);
	ellipse.draw(ctx);
	poly.draw(ctx);
	star.draw(ctx);
	
	
	
	
})();
