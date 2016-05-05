 /*-------------------------------------------------------------------------
	 * prototypeInheritance.js
	 * Patrick Roderman
	 * 
	 * prototypeInheritance Objectives
	 *    1. Use the prototype chain to establish inheritance.
	 *
	 ------------------------------------------------------------------------*/
;(function(){
	// Shape Constructor
	var Shape = function(name, width, height){
		this.name = name;
		this.height = height;
		this.width = width;
		
	}
	//Shape Functions
	Shape.prototype.getName = function(){
			return this.name;
	}	


	//Shape Consstructor
	var Rectangle = function(name, width, height){
		Shape.call(this, name, width, height);
	}
	Rectangle.prototype = Object.create(Shape.prototype);
	//Shape Functions
	Rectangle.prototype.getArea = function(){
			return this.height*this.width;
	};


	//Square Constructor 
	var Square = function(name, size){
		Rectangle.call(this, name, size, size);
	}
	Square.prototype = Object.create(Rectangle.prototype);

	// Tests 
	var r = new Rectangle('rectangle1', 10, 20); 
	console.log( r.getName(), 'has area', r.getArea() ); 
	var s = new Square('square1', 30); 
	console.log( s.getName(), 'has aea', s.getArea() ); 

})();
