general_speed = 5;
wackeligkeit = 5;
wackeligkeit_inacuracy = 3;
rhythm = 60/3;

y_down_min = 10;
y_down_max = y_down_min * 1.2;

amplitude = (y_down_max - y_down_min) / 1.5;

frequency_min = 40;
frequency_max = frequency_min * 1.2;
frequency_inaccuracy = 10;

waves = [];
points = [];

function random_range(min, max) {
    return Math.random() * (max-min) + min;
}

start = new Point(0, view.size.height*0.3);

while (start.y < view.size.height) {
    wave = new Path();
    wave.strokeColor = 'white';
    // move
    start.y += random_range(y_down_min, y_down_max);
    // draw wave
    frequency = random_range(frequency_min, frequency_max);
    moving = start.clone();
    wave.add(moving);
    if (Math.random() < 0.5) {
        i = 0;
    } else {
        i = 2;
    }

    while (moving.x < view.size.width) {
        x = random_range(frequency - frequency_inaccuracy, frequency + frequency_inaccuracy);
        moving.x += x;

        if (i  % 2 === 0) {
            moving.y = start.y;
        } else if (i % 4 === 1) {
            moving.y += random_range(amplitude - frequency_inaccuracy, amplitude + frequency_inaccuracy);
        } else if (i % 4 === 3) {
            moving.y -= random_range(amplitude - frequency_inaccuracy, amplitude + frequency_inaccuracy);
        }
        i ++;
        wave.add(moving);
        points.push(moving);
    }

    wave.smooth();

    waves.push(wave);
}

function onFrame(event) {

    var wackel = 2 + rhythm;

    for (var i = 0; i < points.length;i++) {

        if (event.count % (wackel*general_speed) === 0) {

            var child = points[i];
            var go = random_range(wackeligkeit - wackeligkeit_inacuracy, wackeligkeit + wackeligkeit_inacuracy);
            var vector = new Point(go, go/-3);
            console.log(child.constructor.name);
            if (Math.random() < 0.5) {
                child.position += vector;
            } else {
                child.position -= vector;
            }
        }

        if (Math.random() < 100/points.length) {
            wackel += 1;
        }

    }

}










var text = new PointText({
    point: new Point(0.87*view.size.width, 0.05*view.size.height),
    justification: 'center',
    fontSize: 16,
    fillColor: '#b7b4c2',
    content: "Move along, folks. Nothing to see here."
});

