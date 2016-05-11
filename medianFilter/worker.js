// JS Worker - handle image data from main script
self.onmessage = function(e) {
    
    // get data from message
    var arr = e.data.image.data;
    var height = e.data.image.height;
    var width = e.data.image.width;
    // create array for new pixel data
    var pixels = new Uint8ClampedArray( new ArrayBuffer(((height - 2) * (width-2)) * 4) );

    // filter loop
    for(var rows = 1; rows <= height - 1; rows++) {
        for(var cols = 1; cols <= width - 1; cols++) {
            // get median pixel value
            var pixel = medianPixel(rows, cols, arr);
            // get index
            var index = ((rows - 1) * width + (cols - 1 )) * 4;
            // assign values
            pixels[index] = pixel[0];
            pixels[index+1] = pixel[1];
            pixels[index+2] = pixel[2];
            pixels[index+3] = 255;
        }
    }

    // returns the median value from surrounding and center pixels
    function medianPixel(rows, cols, pixelData) {

        // begining of each pixel's data                    // Coordinates (e.g: center = 1,1)
        var img00 = ((rows - 1) * width + cols - 1) * 4;  // 0,0
        var img01 = ((rows - 1) * width + cols) * 4;      // 0,1
        var img02 = ((rows - 1) * width + cols + 1) * 4; // 0,2

        var img10 = ((rows) * width + cols - 1) * 4;    // 1,0
        var img11 = ((rows) * width + cols) * 4;        // 1,1
        var img12 = ((rows) * width + cols + 1) * 4;    // 1,2

        var img20 = ((rows + 1) * width + cols - 1) * 4;    // 2,0
        var img21 = ((rows + 1) * width + cols) * 4;     // 2,1
        var img22 = ((rows + 1) * width + cols + 1) * 4;  // 2,2


        // array containing arrays for R,G,B values
        var borderRGB = [
            // Red
            [   
                pixelData[img00],
                pixelData[img01],
                pixelData[img02],
                pixelData[img10],
                pixelData[img11],
                pixelData[img12],
                pixelData[img20],
                pixelData[img21],
                pixelData[img22]
            ],
            // Green
            [
                pixelData[img00+1],
                pixelData[img01+1],
                pixelData[img02+1],
                pixelData[img10+1],
                pixelData[img11+1],
                pixelData[img12+1],
                pixelData[img20+1],
                pixelData[img21+1],
                pixelData[img22+1]
            ],
            // Blue
            [
                pixelData[img00+2],
                pixelData[img01+2],
                pixelData[img02+2],
                pixelData[img10+2],
                pixelData[img11+2],
                pixelData[img12+2],
                pixelData[img20+2],
                pixelData[img21+2],
                pixelData[img22+2]

            ]
        ];

        // find medians from RGB array
        var rgba = findMedians(borderRGB);
        rgba.push(255);
        return rgba;
    }

    function findMedians(multiArray) {
        var median = [0, 0, 0];
        // sort and get median index
        median[0] = (multiArray[0].sort())[4];
        median[1] = (multiArray[1].sort())[4];
        median[2] = (multiArray[2].sort())[4]; 
        return median;
    }

    // set new data and post
    e.data.image.data.set(pixels);
    self.postMessage(e.data);
};