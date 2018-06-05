function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

y_down_min = random_range(2, 10);
y_down_max = y_down_min * random_range(1.1, 3);

amplitude = (y_down_max - y_down_min) / random_range(0.01, 100);

frequency_min = random_range(10, 100);
frequency_max = frequency_min * random_range(1.1, 3);

animation_update = 2;
animation_slowing = 1;
inaccuracy_speed = 5;

time_to_first_peak = 10;
inacurracy_amplitude = 1300;
inaccuracy_frequency = 1 / (time_to_first_peak * 4 * 60);
green = 1;
function onFrame(event) {


    if (event.time > 200) {
        event.end();
    }

    if (event.time > 100) {
        green *= 0.999;
    }

    color = new Color(1, green, 1);

    if (event.count % animation_update === 0) {
        project.clear();



        var text = new PointText({
            point: new Point(0.87*view.size.width, 0.05*view.size.height),
            justification: 'center',
            fontSize: 16,
            fillColor: '#b7b4c2',
            content: "Move along, folks. Nothing to see here."
        });

        x = event.time;
        frequency_inaccuracy = 	-2.947003354050176e-33 * Math.pow(x, 17)
                                + 3.8180316561880587e-26 * Math.pow(x, 16)
                                + -5.52817218366232e-23 * Math.pow(x, 15)
                                + 3.616620362776864e-20 * Math.pow(x, 14)
                                + -1.412910009136365e-17 * Math.pow(x, 13)
                                + 3.670250290254584e-15 * Math.pow(x, 12)
                                + -6.679913133479394e-13 * Math.pow(x, 11)
                                + 8.743609407522345e-11 * Math.pow(x, 10)
                                + -8.315880774189718e-09 * Math.pow(x, 9)
                                + 5.737775904860703e-07 * Math.pow(x, 8)
                                + -2.8376103007466896e-05 * Math.pow(x, 7)
                                + 0.0009832274698972534 * Math.pow(x, 6)
                                + -0.02306181681520877 * Math.pow(x, 5)
                                + 0.3489754729597888 * Math.pow(x, 4)
                                + -3.1786619470442856 * Math.pow(x, 3)
                                + 15.653558255954442 * Math.pow(x, 2)
                                + -34.19286674310648 * Math.pow(x, 1)
                                + 23.862800460124426 * Math.pow(x, 0);

        if (event.time < 0.5) {
            frequency_inaccuracy = 1;
        } else if (event.time < 1 && frequency_inaccuracy > 10) {
            frequency_inaccuracy = 10;
        }

        waves = [];
        points = [];



        start = new Point(0, view.size.height * 0.3);

        while (start.y < view.size.height) {
            wave = new Path();
            wave.strokeColor = color;
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

                if (i % 2 === 0) {
                    moving.y = start.y;
                } else if (i % 4 === 1) {
                    moving.y += random_range(amplitude - frequency_inaccuracy, amplitude + frequency_inaccuracy);
                } else if (i % 4 === 3) {
                    moving.y -= random_range(amplitude - frequency_inaccuracy, amplitude + frequency_inaccuracy);
                }
                i++;
                wave.add(moving);
                points.push(moving);
            }

            wave.smooth();

            waves.push(wave);
        }


    }


}






