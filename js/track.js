const track = {
    trackSize: new paper.Size(500, 300),
    fieldSize: new paper.Size(350, 125)
};

function createTrackCanvas(canvas) {
    paper.setup(canvas);

    scale = 0.9 * paper.view.bounds.width / track.trackSize.width;

    console.log('scale = ', scale);

    paper.view.scale(scale);
    paper.view.center = new paper.Size(
        track.trackSize.width / 2,
        track.trackSize.height / 2
    );

    var fieldOrigin = new paper.Size(50, (track.trackSize.height - track.fieldSize.height) / 2);

    var field = new paper.Rectangle(
        fieldOrigin,
        track.fieldSize
    );

    var fieldPath = new paper.Path.Rectangle(field, track.fieldSize.height/2);

    fieldPath.strokeColor = '#ffffff';
    fieldPath.fillColor = '#07a61e';
    
    for (i=0; i<6;i++){

    drawTrackLane(fieldOrigin, track.fieldSize.width, track.fieldSize.height, i);
    }
    
    paper.view.draw();
}

function drawTrackLane(origin, width, height, laneNumber) {
    var radius = height/2;
    var offset = (laneNumber + 1) * 10;
    var path = new paper.Path();
    
    // Give the stroke a color
    path.strokeColor = '#f26257';
    path.strokeWidth = 9;
    
    var start = new paper.Point(origin.width+width-radius, origin.height-offset);
    
    // Move to start and draw a line from there
	path.moveTo(start);

    path.lineTo(new paper.Point(origin.width+radius, origin.height-offset));
    
    path.arcTo(
        new paper.Point(origin.width-offset,origin.height+radius),
        new paper.Point(origin.width+radius,origin.height+height+offset)
    );

    path.lineTo(new paper.Point(origin.width+width-radius,origin.height+height+offset));

    path.arcTo(
        new paper.Point(origin.width+width+offset,origin.height+radius),
        start
    );



}