const track = {
    trackSize: new paper.Size(500, 300),
    fieldSize: new paper.Size(350, 125)
};

const people = [
    {
        name:"Kassi",
        color:"#f7eb05",
        progress: .84,
        lastProgress: .72,
        lane: 0,
        path: null
    },
    {
        name:"Denise",
        color:"#ffffff",
        progress: .72,
        lastProgress: .61,
        lane: 1,
        path: null
    },
    {
        name:"Dakotah",
        color:"#0c26ed",
        progress: .58,
        lastProgress: .34,
        lane: 2,
        path: null
    },
    {
        name:"Joe",
        color:"#09ed11",
        progress: .83,
        lastProgress: .69,
        lane: 3,
        path: null
    },
    {
        name:"Kelly",
        color:"#830fd1",
        progress: .71,
        lastProgress: .67,
        lane: 4,
        path: null
    },
    {
        name:"Todd",
        color:"#f58c0c",
        progress: .88,
        lastProgress: .62,
        lane: 5,
        path: null
    }
]
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
    
    for (var person of people) {
        person.path=drawTrackLane(fieldOrigin, track.fieldSize.width, track.fieldSize.height, person.lane);
    }

    for (var person of people) {
        drawMarker(people[0].path, person, fieldOrigin, track.fieldSize.width, track.fieldSize.height);
    }

    for (var person of people) {
        drawLegend(person, fieldOrigin)
    }
    
    var finishLine = new paper.Path();
    
    finishLine.strokeColor = '#e9e8eb';
    finishLine.strokeWidth = 1.75;
    var lane0Start = people[0].path.getPointAt(0);
    var laneNStart = people[people.length-1].path.getPointAt(0);
    var finishLineStart = new paper.Point(lane0Start.x-7,lane0Start.y+4.5);
    var finishLineEnd = new paper.Point(lane0Start.x-7,laneNStart.y-4.5);

    finishLine.moveTo(finishLineStart);
    finishLine.lineTo(finishLineEnd);

    /*var logo = new Raster({
        source: '/img/Kennonlogo.png',
        position: (fieldOrigin.width + track.fieldSize.width/3,
        fieldOrigin.height+30)
    });*/
    var testPosition = new paper.Point(0,0);
    var testImage = "/img/Kennonlogo.png";
    var raster = new paper.Raster(testImage);

    raster.position = (fieldOrigin.width + track.fieldSize.width/3,
        fieldOrigin.height+65);
    raster.scale(.25);

    raster.onLoad = function() {
        console.log('loaded');
    };

    raster.onError = function() {
        console.error('error');
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

    return path;

}

function drawMarker (lane0path, person, origin, width, height) {
    
    var radius = height/2;
    var offset = (person.lane + 1) * 10;
    var startOffset = person.path.length-lane0path.length;
    var startPoint = person.path.getPointAt(startOffset+lane0path.length*person.lastProgress);
    var marker = new paper.Path.Circle(startPoint, 5);
    marker.fillColor = person.color;
    var endPoint = person.path.getPointAt(startOffset+lane0path.length*person.progress);

    var startLine = new paper.Path();
    startLine.strokeColor = '#e9e8eb';
    startLine.strokeWidth = 1.75;
    
    var start = person.path.getPointAt(person.path.length-lane0path.length+7);
    
    // Move to start and draw a line from there
    startLine.moveTo(new paper.Point(start.x,start.y+person.path.strokeWidth/2));
    startLine.lineTo(new paper.Point(start.x,start.y-person.path.strokeWidth/2));
    //startLine.moveBy(new paper.Point(0,person.path.strokeWidth/2));
    //startLine.lineBy(new paper.Point(0,-person.path.strokeWidth));
    
    //startLine.lineTo(new paper.Point(origin.width+radius, origin.height-offset));
    marker.tween(
        {position: startPoint},
        {position: endPoint},
        3000
    );

}
  
function drawLegend (person, fieldOrigin) {
    var namePosition = new paper.Point(
        fieldOrigin.width + track.fieldSize.width/2,
        fieldOrigin.height+30+person.lane*15
    );   
    // Create a point-text item:
    var text = new paper.PointText(namePosition);
    text.fillColor = person.color;
    text.content = person.name;

    var progressPosition = new paper.Point(
        fieldOrigin.width + (track.fieldSize.width/2-30),
        fieldOrigin.height+30+person.lane*15
    );

    var positionPercent = person.progress*100

    var positionText = new paper.PointText(progressPosition);
    positionText.fillColor = person.color;
    positionText.content = positionPercent.toString() + "%"
     
}
