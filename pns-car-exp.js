var serialPort = require('serialport'),
    app = require('express')(),
    server = require('http').createServer(app),
    serial = new serialPort(
        'COM1',
        { baudRate: 57600 }
    ),
    port = 9000;

server.listen(port);

(function () {
    console.log('\n\npns server running\n\n');
})();

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/pns-car.html');
});

// Read the port data
serial.on("open", () => {
    console.log('serial port open');
    setTimeout(function () {
        serial.write("1\n");
    }, 5000);
});
//
// FORWARD
//
app.get('/forward', function (request, response) {
    console.log("forward command sent");
    serial.write(Buffer.alloc(1), function (err) {
        if (err) console.log("ERR: ", err);
        console.log("callback forward msg");
        response.end();
    });
});
//
// REVERSE
//
app.get('/reverse', function (request, response) {
    serial.open(function (err) {
        serial.write(Buffer.alloc(2), function () {
            console.log("callback reverse msg");
            serial.close();
            response.end();
        });
    });
});
//
// STOP
//
app.get('/stop', function (request, response) {
    serial.write(Buffer.alloc(3), function (err) {
        if (err) console.log("ERR: ", err);
        console.log("callback stop msg");
        response.end();
    });
});
//
// RIGHT
//
app.get('/right-down', function (request, response) {
    serial.open(function (err) {
        serial.write(Buffer.alloc(0), function () {
            console.log("callback right-down msg");
            serial.close();
            response.end();
        });
    });
});
app.get('/right-up', function (request, response) {
    serial.open(function (err) {
        serial.write(Buffer.alloc(0), function () {
            console.log("callback right-up msg");
            serial.close();
            response.end();
        });
    });
});
//
// LEFT
//
app.get('/left-down', function (request, response) {
    serial.open(function (err) {
        serial.write(Buffer.alloc(0), function () {
            console.log("callback left-down msg");
            serial.close();
            response.end();
        });
    });
});
app.get('/left-up', function (request, response) {
    serial.open(function (err) {
        serial.write(Buffer.alloc(0), function () {
            console.log("callback left-up msg");
            serial.close();
            response.end();
        });
    });
});
