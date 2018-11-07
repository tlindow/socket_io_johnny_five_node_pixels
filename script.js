var app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  five = require('johnny-five'),
  pixel = require('node-pixel');

var strip = null;
var fps = 10;


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
var led = null;
board = new five.Board({
  port: "COM4"
});

board.on("ready", function() {
  strip = new pixel.Strip({
    data: 6,
    length: 8,
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: "FIRMATA",
  });
  strip.on("ready", function() {

    console.log("Strip ready, let's go");

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    //var current_colors = [0,1,2,3,4];
    var current_pos = [0, 1, 2, 3, 4];

    current_pos.forEach((pos) => {
      strip.pixel(pos).color(colors[pos]);
    });

    var blinker = setInterval(function() {

      strip.shift(1, pixel.FORWARD, true);

      strip.show();
    }, 1000 / fps);
  });
});


io.on('connection', function(socket) {
  socket.on('click', function(buttonState) {
    if (buttonState === "OFF") {
      strip.color("#000000");
    } else if (buttonState === "ON") {
      var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
      //var current_colors = [0,1,2,3,4];
      var current_pos = [0, 1, 2, 3, 4];

      current_pos.forEach((pos) => {
        strip.pixel(pos).color(colors[pos]);
      });
    }
    console.log("LED..." + buttonState);
  });
});