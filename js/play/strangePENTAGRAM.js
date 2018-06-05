
pentagram = new Path();
pentagram.strokeColor = 'black';
pentagram.closed = true;
start = new Point(300, 100);
//pentagram.add(start);

number = 5;
circle = 360;
angle = circle/number;

vector = new Point();
vector.angle = 0;
vector.length = 100;

between_angle_1 = 45;

between_length = (vector.length/2) / Math.cos(between_angle_1);


next_point = start.clone();

for (i = 0; i < number; i += 1) {
    next_point = next_point + vector;
    pentagram.add(next_point);

    vector.angle += angle;

    between_vector = new Point();
    between_vector.length = between_length;
    between_vector.angle = vector.angle - between_angle_1;

    between_point = next_point + between_vector;
    pentagram.add(between_point);
}





