const track = {
    trackSize: new paper.Size(500, 300),
    fieldSize: new paper.Size(400, 175)
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

    paper.view.draw();
}
