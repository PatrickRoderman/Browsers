 /*-------------------------------------------------------------------------
	 * SVG
	 * Patrick Roderman
	 * 
	 * SVG Objectives
	 *    1. Practice using SVGs and their methods (Snap.js methods).
	 *    2. Use Snap.js
	 *
	 ------------------------------------------------------------------------*/
	 
;(function(){
	//Snap.js Paper var
	var cvs = Snap("#cvs");
	
	//create 3 SVG ellipses
	function createSvgs(){
		for (var x = 100; x <= 600; x += 200) {
			// Create and style ellipse
			var el = cvs.ellipse(x+10, 200,70, 70);
			el.attr({fill: 'white', stroke: 'black', strokeWidth: '0px'});
			
			//Add hover event
			el.hover(
				function(e) { this.animate({rx:'100', ry:'100', opacity:".8"}, 500, mina.bounce); },
				function(e) { this.animate({rx:'70', ry:'70',opacity:"1"}, 500, mina.backin); }
			);
			
			switch(x){
				case 100:
					//set fill
					el.attr({fill:"#ffa700"});
					//create text 
					cvs.text(73,210,"GOOGLE").attr({fill: "white",  pointerEvents: "none",fontSize: "40",fontFamily: "fairview"});
					//redirect
					el.click(
						function(e){ document.location = "http://Google.com";}
					);
				break;
				
				case 300:
					//set fill
					el.attr({fill:"#55acee"});
					//create text 
					cvs.text(268,210,"TWITTER").attr({fill: "white", pointerEvents: "none", fontSize: "40",fontFamily: "fairview"})
					//redirect
					el.click(
						function(e){ document.location = "http://Twitter.com";}
					);
					break;
				
				case 500:
					//set fill
					el.attr({fill:"#3B5998"});
					//create text 
					cvs.text(460,210,"FACEBOOK").attr({fill: "white", pointerEvents: "none", fontSize: "40",fontFamily: "fairview"})
					//redirect
					el.click(
						function(e){ document.location = "http://Facebook.com";}
					);
					break;
					
				default:
					break;
			}
		}
	}
	createSvgs();
})();