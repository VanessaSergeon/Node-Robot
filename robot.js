var robot = reequire('node-robot');
var adaptor = new robot.ev3.Adaptor('/dev/rfcomm0');
var motors = new robot.ev3.Motors(adaptor);

motors.set('A, B, C', 50); // can set speed up to 100 and go negative.