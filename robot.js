var robot = require('node-robot');
var sensors = require("node-robot").ev3.sensors;


var adapter = new robot.ev3.Adapter('/dev/tty.EV3-SerialPort');
var motors = new robot.ev3.Motors(adapter);
var ColorSensor = robot.ev3.sensors.ColorSensor;

// *** SENSORS
var colorSensor = new sensors.ColorSensor(adapter, 1);
var touchSensor = new sensors.TouchSensor(adapter, 2);
var infraSensor = new sensors.InfraSensor(adapter, 3);


adapter.on('ready', function() {

infraSensor.value > 0 //will be an integer
touchSensor.value == false;
colorSensor.value == ColorSensor.colors.BLACK

//motors.get('A, B, C');
motors.set('A, B, C', 50); // can set speed up to 100 and go negative.


touchSensor.on('change', function(newVal, oldVal){
  console.log('Changed to: ' + (newVal ? 'pressed' : 'released'));
})

infraSensor.on('change', function(val){
  console.log('Distance is: ' + val);
})

}); // end ready