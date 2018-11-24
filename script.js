var app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  five = require('johnny-five'),
  pixel = require('node-pixel');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

board1 = new five.Board({
  port: "COM4"
});
board2 = new five.Board({
  port: "COM5"
});

var blinker;
var strip1 = null;
var strip2 = null;
var shortStripLength = 18;
var longStripLength = 37;
var fps1 = 25;
var fps2 = 25;
// var fps2 = fps1 / (longStripLength / shortStripLength);


function setInitLedPos(startPos) {
  var array = [];
  for (i = 0; i < 5; i++) {
    array.push(startPos);
    startPos += 1;
  }
  return array;
}

var pin1_initial_pos = setInitLedPos(0);
var pin2_initial_pos = setInitLedPos(1 * shortStripLength + 0 * longStripLength);
var pin3_initial_pos = setInitLedPos(1 * shortStripLength + 1 * longStripLength);
var pin4_initial_pos = setInitLedPos(2 * shortStripLength + 1 * longStripLength);
var pin5_initial_pos = setInitLedPos(2 * shortStripLength + 2 * longStripLength);
var pin6_initial_pos = setInitLedPos(3 * shortStripLength + 2 * longStripLength);
var pin7_initial_pos = setInitLedPos(3 * shortStripLength + 3 * longStripLength);
var pin8_initial_pos = setInitLedPos(4 * shortStripLength + 3 * longStripLength);
var pin9_initial_pos = setInitLedPos(4 * shortStripLength + 4 * longStripLength);
var pin10_initial_pos = setInitLedPos(5 * shortStripLength + 4 * longStripLength);
var pin11_initial_pos = setInitLedPos(5 * shortStripLength + 5 * longStripLength);

function startBothBoards() {
  board1.on("ready", function() {
    strip1 = new pixel.Strip({
      color_order: pixel.COLOR_ORDER.GRB,
      board: this,
      controller: "FIRMATA",
      strips: [{
        pin: 7,
        length: longStripLength
      }]
    });
    strip1.on("ready", function() {
      console.log("Strip ready, let's go");

      var colors = ["green", "green", "green", "green", "green", "magenta", "white"];
      //var current_colors = [0,1,2,3,4];
      // var current_pos = [0, 1, 2, 3, 4];
      function joinInitLedPos() {

      }
      var initial_pos = [0, 1, 2, 3, 4]
      strip1.color("black");
      //repeat this within blinker function
      initial_pos.forEach((pos) => {
        strip1.pixel(pos).color("blue");
      });


      var blinker = setInterval(function() {

        strip1.shift(1, pixel.FORWARD, true);

        strip1.show();
        // if (strip.pixel(11).color().color === "red" || strip.pixel(48).color().color === "green") {
        //   strip.color("black");
        // }

      }, 1000 / fps1);


    });

  });

  board2.on("ready", function() {
    strip2 = new pixel.Strip({
      color_order: pixel.COLOR_ORDER.GRB,
      board: this,
      controller: "FIRMATA",
      strips: [{
        pin: 7,
        length: shortStripLength
      }]
    });
    strip2.on("ready", function() {
      console.log("Strip ready, let's go");

      var colors = ["green", "green", "green", "green", "green", "magenta", "white"];
      //var current_colors = [0,1,2,3,4];
      // var current_pos = [0, 1, 2, 3, 4];
      function joinInitLedPos() {

      }
      var initial_pos = [0, 1, 2, 3, 4]
      strip2.color("black");
      //repeat this within blinker function
      initial_pos.forEach((pos) => {
        strip2.pixel(pos).color("blue");
      });

      var blinker2 = setInterval(function() {

        strip2.shift(1, pixel.FORWARD, true);

        strip2.show();
        // if (strip.pixel(11).color().color === "red" || strip.pixel(48).color().color === "green") {
        //   strip.color("black");
        // }

      }, 1000 / fps2);



    });

  });
}

startBothBoards();



io.on('connection', function(socket) {

  socket.on('click', function(buttonState) {
    var strip_pos = [0, 1, 2, 3, 4, 5];
    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    if (buttonState === "OFF") {
      strip1.color("#000000");
      strip_pos.forEach((pos) => {
        strip1.pixel(pos).color(colors[1]);
      });
    } else if (buttonState === "ON") {
      strip2.color("#000000");
      strip_pos.forEach((pos) => {
        strip2.pixel(pos).color(colors[0]);
      });
    }
    console.log("LED..." + buttonState);
  });
});