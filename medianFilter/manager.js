/*-------------------------------------------------------------------------
 * manager.js
 * Patrick Roderman
 *
 * manager Objectives
 *    1.Split the image horizontally into roughly equal strips and
 *    divide the work amongst multiple Web Workers.
 *       1a. The goal of this project is to demonstrate the viability of
 *          this idea using the median filter, which is frequently the
 *          most computationally intensive of all pixel region
 *          processing filters.
 ------------------------------------------------------------------------*/
;(function( imgSrc ) {

    // document.getElementById bind
    var el = document.getElementById.bind( document );
    // create image obj
    var img = new Image();
    // set source
    img.src = imgSrc;
    // create canvas
    var canvas = document.createElement( "canvas" );
    // center canvas
    canvas.style.margin = "auto";
    canvas.style.display = "block";
    // get context
    var context = canvas.getContext('2d');
    // attach canvas to body
    document.body.appendChild( canvas );
    // Load image into an in-memory Image.
    img.onload = function ( e ) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage( img, 0, 0 );
    }

    // elements
    var button = el( 'btn' );
    var slider = el( 'slider' );
    var numOfWorkers = el( 'numOfWorkers' );
    numOfWorkers.innerHTML = slider.value;
    // slider listener
    slider.addEventListener( "change", function(){
        numOfWorkers.innerHTML = slider.value;
    } );

    // worker array
    var workers = [];

    // button listener
    button.addEventListener( "click", function ( e ) {
        // hide UI with an image-loading div
        document.getElementById( "loader" ).style.display = "block";
        initWorkers( slider.value );
        messageWorkers( slider.value, workers );
    });

    // generate workers based on int
    function initWorkers( num ){
        for( var i = 0; i < num ; i++ ){
            workers[i] = ( new Worker( "worker.js" ) );
        }
    }
    // send respective strips of image data to workers
    function messageWorkers( num, workers ){

        var height = Math.ceil( ( img.height - 2 ) / num );
        var y = 1; // y coordinate
        for( var i = 0; i < num; i++ ) {
            // post image object to worker
            workers[i].postMessage({
                image: context.getImageData( 0, y, canvas.width, height ),
                y: y
            });

            // worker onmessage
            workers[i].onmessage = function( e ) { 
                // y start
                var y = e.data.y;

                // image data
                var image = e.data.image;

                // put image data back at y
                context.putImageData( image, 0, y );
                
                // hide image-loading div
                document.getElementById( "loader" ).style.display = "none";
                
                // terminate the worker
                this.terminate();
            }
            // increment y by strip-height
            y += height;
        } 
    }

})( "coins.jpg" ); // image source