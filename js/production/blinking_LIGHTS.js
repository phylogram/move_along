
var number_of_items = Math.floor(Math.random()*20)+10;

objects = [];

speed = 4;
second = Math.floor(speed * 0.66);
same = 3;

textOn = 47;
textOf = 45;
textFront = 68;


var text = new PointText({
    point: view.center,
    justification: 'center',
    fontSize: 30,
    fillColor: '#b7b4c2',
    content: "Move along, folks. Nothing to see here."
});

function onFrame(event) {
    if (event.count === 3300) {
        event.stop();
    }

    if (event.count%103 === 50) {
        speed += 1;
        console.log(speed);
        console.log(event.count);
    } else if (event.count%100 === 0) {
        speed -= 1;
        console.log(speed);
    }

    if (event.count > 600 && event.count % 100 === 0) {
        speed += 1;
    }

    if (event.count%speed === 0) {

        var color = new Color(Math.random(), Math.random(), Math.random());

        var object = new Path.RegularPolygon(
            new Point(Math.random() * 1301, Math.random() * 700),
            Math.floor(Math.random()*5) + 3,
            (Math.random() * 500) + 50
        );

        object.fillColor = color;
        objects.push(object);
    }


    if (event.count > speed*same && event.count%speed === second && objects.length > 0) {
        object = objects.shift();
        object.visible = false;
    }

    if (event.count % textOn === 0) {
        text.visible = true;
        text.position += new Point(50, 4);
    } else if (event.count % textOf === 0) {
        text.visible = false;
        text.position += new Point(-40, -8);
    }



    if (event.count % textFront === 0) {
        text.bringToFront();
    }
}




