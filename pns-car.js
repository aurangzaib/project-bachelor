var serialport = require('serialport'),
	app = require('express')(),
	server = require('http').createServer(app),
	serial = new serialport.SerialPort('/dev/ttyACM0', {
		baudrate: 9600,
	}),
	value = 0x00,
	port = 8080;
server.listen(port);
(function () {
	console.log('\n\npns server running\n\n');
})();
app.get('/', function (request, response) {
	response.sendfile(__dirname + '/pns-car.html');
});
//
// FORWARD
//
app.get('/forward', function (request, response) {
	serial.write(new Buffer([0x00]));
	response.end();
});
//
// REVERSE
//
app.get('/reverse', function (request, response) {
	serial.write(new Buffer([0x01]));
	response.end();
});
//
// STOP
//
app.get('/stop', function (request, response) {
	serial.write(new Buffer([0x02]));
	response.end();
});
//
// RIGHT
//
app.get('/right-down', function (request, response) {
	serial.write(new Buffer([0x03]));
	response.end();
});
app.get('/right-up', function (request, response) {
	serial.write(new Buffer([0x04]));
	response.end();
});
//
// LEFT
//
app.get('/left-down', function (request, response) {
	serial.write(new Buffer([0x05]));
	response.end();
});
app.get('/left-up', function (request, response) {
	serial.write(new Buffer([0x06]));
	response.end();
});
