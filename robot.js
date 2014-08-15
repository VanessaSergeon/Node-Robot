var robot = require('node-robot');
var sensors = require("node-robot").ev3.sensors;


var adapter = new robot.ev3.Adapter('/dev/tty.EV3-SerialPort');
var motors = new robot.ev3.Motors(adapter);
var ColorSensor = robot.ev3.sensors.ColorSensor;

var colorToString = {};

colorToString[ColorSensor.colors.NULL] = "None";
colorToString[ColorSensor.colors.BLACK] = "Black";
colorToString[ColorSensor.colors.BLUE] = "Blue";
colorToString[ColorSensor.colors.GREEN] = "Green";
colorToString[ColorSensor.colors.YELLOW] = "Yellow";
colorToString[ColorSensor.colors.RED] = "Red";
colorToString[ColorSensor.colors.WHITE] = "White";
colorToString[ColorSensor.colors.BROWN] = "Brown";

// *** SENSORS
var colorSensor = new sensors.ColorSensor(adapter, 1);
var touchSensor = new sensors.TouchSensor(adapter, 2);
var infraSensor = new sensors.InfraSensor(adapter, 3);
touchSensor.averageValueSampleSet = 3;

adapter.on('ready', function() {
console.log("running...");
infraSensor.value > 0 //will be an integer
touchSensor.value == false;
colorSensor.value == ColorSensor.colors.BLACK;

//motors.get('A, B, C');
motors.set('A, B, C', 50); // can set speed up to 100 and go negative.


touchSensor.on('change', function(newVal, oldVal){
  console.log('Changed to: ' + (newVal ? 'pressed' : 'released'));
})

infraSensor.on('change', function(val){
  console.log('Distance is: ' + val);
    motors.set("A, D", 5);
});

// colorSensor.on('change', function(colorToString){
//   console.log('Color is: ' + colorToString);
// })

colorSensor.on("change", function(newVal, oldVal){
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write("Color sensor reading: " + colorToString[newVal]);
  if(colorToString[newVal].toString() == "Blue" || colorToString[newVal].toString() == "Black"){
    motors.set("A, D", -50);
  }
})




}); // end ready