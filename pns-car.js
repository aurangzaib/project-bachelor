// libray to communicate with serial port
var serialport = require('serialport');
// library to help create a server
var app = require('express')();
// library to create server
var server = require('http').createServer(app),
// open a serial port - cu.usbmodem14101 is on macOS
// TODO: use correcr serial port for raspi
var serial = new serialport('/dev/cu.usbmodem14101', {baudRate: 9600,});
// port for server
var port = 8080;

// start the server
server.listen(port);

// print that the server is running
(function () {
	console.log('\n\npns server running\n\n');
})();

// app main route
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/pns-car.html');
});

// app FORWARD route
app.get('/forward', function (request, response) {
	// write on serial port
	// it will be received by Arduino
	serial.write(new Buffer([0x00]), function(err){
		if (err) { console.log("Err in forward command"); }
		console.log("forward command sent");
		response.end();
	});
});

// app REVERSE route
app.get('/reverse', function (request, response) {
	serial.write(new Buffer([0x01]));
	console.log("reverse command sent");
	response.end();
});

// app STOP route
app.get('/stop', function (request, response) {
	serial.write(new Buffer([0x02]), function(err){
		if (err) {
			console.log("Err in stop command");
		}
		console.log("stop command sent");
		response.end();
	});
});

// app RIGHT route
app.get('/right-down', function (request, response) {
	serial.write(new Buffer([0x03]));
	console.log("right down command sent");
	response.end();
});
app.get('/right-up', function (request, response) {
	serial.write(new Buffer([0x04]));
	console.log("right up command sent");
	response.end();
});

// app LEFT route
app.get('/left-down', function (request, response) {
	serial.write(new Buffer([0x05]));
	console.log("left down command sent");
	response.end();
});
app.get('/left-up', function (request, response) {
	serial.write(new Buffer([0x06]));
	console.log("left up command sent");
	response.end();
});
