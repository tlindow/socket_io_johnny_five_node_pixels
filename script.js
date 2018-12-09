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
var strip1 = null;

board2 = new five.Board({
  port: "COM5"
});
var strip2 = null;


var shortStripLength = 18;
var longStripLength = 37;
var fps = 25;

//Setup initial led positions for each pin/strip
var initial_led_pos = [];
initial_led_pos[0] = setInit5LedPos(0);
initial_led_pos[1] = setInit5LedPos(1 * shortStripLength);
initial_led_pos[2] = setInit5LedPos(2 * shortStripLength);
initial_led_pos[3] = setInit5LedPos(3 * shortStripLength);
initial_led_pos[4] = setInit5LedPos(4 * shortStripLength);
initial_led_pos[5] = setInit5LedPos(5 * shortStripLength);
initial_led_pos[6] = setInit5LedPos(0);
initial_led_pos[7] = setInit5LedPos(1 * longStripLength);
initial_led_pos[8] = setInit5LedPos(2 * longStripLength);
initial_led_pos[9] = setInit5LedPos(3 * longStripLength);
initial_led_pos[10] = setInit5LedPos(4 * longStripLength);


var initial_posA = initial_led_pos[6];
var initial_posB = initial_led_pos[7];
var initial_posC = initial_led_pos[8];
var initial_posD = initial_led_pos[9];
var initial_posE = initial_led_pos[10];
var initial_posF = initial_led_pos[0];
var initial_posG = initial_led_pos[1];
var initial_posH = initial_led_pos[2];
var initial_posI = initial_led_pos[3];
var initial_posJ = initial_led_pos[4];
var initial_posK = initial_led_pos[5];

function setInit5LedPos(startPos) {
  var array = [];
  for (i = 0; i < 5; i++) {
    array.push(startPos);
    startPos += 1;
  }
  return array;
}

function startBothBoards() {
  board1.on("ready", function() {

    strip1 = new pixel.Strip({
      color_order: pixel.COLOR_ORDER.GRB,
      board: this,
      controller: "FIRMATA",
      strips: [{
        pin: 6,
        length: longStripLength
      }, {
        pin: 7,
        length: longStripLength
      }, {
        pin: 8,
        length: longStripLength
      }, {
        pin: 9,
        length: longStripLength
      }, {
        pin: 10,
        length: longStripLength
      }]
    });

    strip1.on("ready", function() {
      console.log("Strip ready, let's go");

      function movingSun() {

        //Define circle shape by rows
        row_1 = 1;
        row_2 = [longStripLength, longStripLength+1, longStripLength+2];
        row_3 = [2*longStripLength, 2*longStripLength+1, 2*longStripLength+2];
        row_4 = [3*longStripLength, 3*longStripLength+1, 3*longStripLength+2];
        row_5 = [1 + 4* longStripLength];

        start = setInterval(function() {
          strip1.color("black");
          strip1.pixel(row_1).color("orange");
          row_1 = row_1.map(function(pos) {
            return pos + 1;
          });
          row_2.forEach((pos) => {
            strip1.pixel(pos).color("orange");
          });
          row_2 = row_2.map(function(pos) {
            return pos + 1;
          });
          row_3.forEach((pos) => {
            strip1.pixel(pos).color("orange");
          });
          row_3 = d.map(function(pos) {
            return pos + 1;
          });
          row_4.forEach((pos) => {
            strip1.pixel(pos).color("orange");
          });
          row_4 = row_4.map(function(pos) {
            return pos + 1;
          });
          strip1.pixel(row_5).color("orange");
          row_5 = row_5.map(function(pos) {
            return pos + 1;
          });
          strip1.show();
        }, 1000/5);
      }



      startA = function startA() {
        strip1.color("black");

        if (initial_posA[4] < longStripLength) {
          initial_posA.forEach((pos) => {
            strip1.pixel(pos).color("white");
          });
        } else {
          console.log("else!");
          initial_posA = initial_led_pos[6];
          strip1.color("black");
          strip1.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posA);
        initial_posA = initial_posA.map(function(pos) {
          return pos + 1;
        });
        strip1.show();
      };

      startB = function startB() {
        strip1.color("black");
        if (initial_posB[4] < 2 * longStripLength) {
          initial_posB.forEach((pos) => {
            strip1.pixel(pos).color("white");
          });
        } else {
          initial_posB = initial_led_pos[7];
          strip1.color("black");
          strip1.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posB);
        initial_posB = initial_posB.map(function(pos) {
          return pos + 1;
        });
        strip1.show();
      };

      startC = function startC() {
        strip1.color("black");
        if (initial_posC[4] < 3 * longStripLength) {
          initial_posC.forEach((pos) => {
            strip1.pixel(pos).color("white");
          });
        } else {
          initial_posC = initial_led_pos[8];
          strip1.color("black");
          strip1.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posC);
        initial_posC = initial_posC.map(function(pos) {
          return pos + 1;
        });
        strip1.show();
      };

      startD = function startD() {
        strip1.color("black");
        if (initial_posD[4] < 4 * longStripLength) {
          initial_posD.forEach((pos) => {
            strip1.pixel(pos).color("white");
          });
        } else {
          initial_posD = initial_led_pos[9];
          strip1.color("black");
          strip1.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posD);
        initial_posD = initial_posD.map(function(pos) {
          return pos + 1;
        });
        strip1.show();
      };

      startE = function startE() {
        strip1.color("black");
        if (initial_posE[4] < 5 * longStripLength) {
          initial_posE.forEach((pos) => {
            strip1.pixel(pos).color("white");
          });
        } else {
          initial_posE = initial_led_pos[10];
          strip1.color("black");
          strip1.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posE);
        initial_posE = initial_posE.map(function(pos) {
          return pos + 1;
        });
        strip1.show();
      };
    });
  });

  board2.on("ready", function() {
    strip2 = new pixel.Strip({
      color_order: pixel.COLOR_ORDER.GRB,
      board: this,
      controller: "FIRMATA",
      strips: [{
        pin: 2,
        length: shortStripLength
      }, {
        pin: 3,
        length: shortStripLength
      }, {
        pin: 4,
        length: shortStripLength
      }, {
        pin: 5,
        length: shortStripLength
      }, {
        pin: 6,
        length: shortStripLength
      }, {
        pin: 7,
        length: shortStripLength
      }]
    });
    strip2.on("ready", function() {
      console.log("Strip ready, let's go");
      startF = function startF() {
        strip2.color("black");
        if (initial_posF[4] < shortStripLength) {
          initial_posF.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posF = initial_led_pos[0];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posF);
        initial_posF = initial_posF.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };

      startG = function startG() {
        strip2.color("black");
        if (initial_posG[4] < 2 * shortStripLength) {
          initial_posG.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posG = initial_led_pos[1];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posG);
        initial_posG = initial_posG.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };

      startH = function startH() {
        strip2.color("black");
        if (initial_posH[4] < 3 * shortStripLength) {
          initial_posH.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posH = initial_led_pos[2];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posH);
        initial_posH = initial_posH.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };

      startI = function startI() {
        strip2.color("black");
        if (initial_posI[4] < 4 * shortStripLength) {
          initial_posI.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posI = initial_led_pos[3];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posI);
        initial_posI = initial_posI.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };

      startJ = function startJ() {
        strip2.color("black");
        if (initial_posJ[4] < 5 * shortStripLength) {
          initial_posJ.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posJ = initial_led_pos[4];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posJ);
        initial_posJ = initial_posJ.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };

      startK = function startK() {
        strip2.color("black");
        if (initial_posK[4] < 6 * shortStripLength) {
          initial_posK.forEach((pos) => {
            strip2.pixel(pos).color("white");
          });
        } else {
          initial_posK = initial_led_pos[5];
          strip2.color("black");
          strip2.show();
          clearInterval(blinkLEDs);
        }
        console.log(initial_posK);
        initial_posK = initial_posK.map(function(pos) {
          return pos + 1;
        });
        strip2.show();
      };
    });
  });
}

startBothBoards();
var blinkLEDs;
var startA;
var startB;
var startC;
var startD;
var startE;
var startF;
var startG;
var startH;
var startI;
var startJ;
var startK;

io.on('connection', function(socket) {
  socket.on('A', function(led_1) {
    clearInterval(blinkLEDs);
    console.log("Button one connect");
    if (led_1 === "OFF") {
      console.log("LED1 " + led_1);
    } else if (led_1 === "ON") {
      initial_posA = initial_led_pos[6];
      blinkLEDs = setInterval(startA, 1000 / fps);
      console.log("LED1 " + led_1);
    }
  });

  socket.on('B', function(led_2) {
    console.log("Button two connect");
    clearInterval(blinkLEDs);
    if (led_2 === "OFF") {
      console.log("LED2 " + led_2);

    } else if (led_2 === "ON") {
      initial_posB = initial_led_pos[7];
      blinkLEDs = setInterval(startB, 1000 / fps);
      console.log("LED2 " + led_2);
    }
  });

  socket.on('C', function(led_3) {
    console.log("Button two connect");
    clearInterval(blinkLEDs);
    if (led_3 === "OFF") {
      console.log("LED3 " + led_3);
    } else if (led_3 === "ON") {
      initial_posC = initial_led_pos[8];
      blinkLEDs = setInterval(startC, 1000 / fps);
      console.log("LED3 " + led_3);
    }
  });

  socket.on('D', function(led_4) {
    console.log("Button two connect");
    clearInterval(blinkLEDs);
    if (led_4 === "OFF") {
      console.log("LED4 " + led_4);
    } else if (led_4 === "ON") {
      initial_posD = initial_led_pos[9];
      blinkLEDs = setInterval(startD, 1000 / fps);
      console.log("LED4 " + led_4);
    }
  });

  socket.on('E', function(led_5) {
    console.log("Button two connect");
    clearInterval(blinkLEDs);
    if (led_5 === "OFF") {
      console.log("LED5 " + led_5);
    } else if (led_5 === "ON") {
      initial_posE = initial_led_pos[10];
      blinkLEDs = setInterval(startE, 1000 / fps);
      console.log("LED5 " + led_5);
    }
  });

  socket.on('F', function(led_6) {
    clearInterval(blinkLEDs);
    if (led_6 === "OFF") {
      console.log("LED6 " + led_6);
    } else if (led_6 === "ON") {
      initial_posF = initial_led_pos[0];
      blinkLEDs = setInterval(startF, 1000 / fps);
      console.log("LED6 " + led_6);
    }
  });

  socket.on('G', function(led_7) {
    clearInterval(blinkLEDs);
    if (led_7 === "OFF") {
      console.log("LED7 " + led_7);
    } else if (led_7 === "ON") {
      initial_posG = initial_led_pos[1];
      blinkLEDs = setInterval(startG, 1000 / fps);
      console.log("LED7 " + led_7);
    }
  });

  socket.on('H', function(led_8) {
    clearInterval(blinkLEDs);
    if (led_8 === "OFF") {
      console.log("LED8 " + led_8);
    } else if (led_8 === "ON") {
      initial_posH = initial_led_pos[2];
      blinkLEDs = setInterval(startH, 1000 / fps);
      console.log("LED8 " + led_8);
    }
  });

  socket.on('I', function(led_9) {
    clearInterval(blinkLEDs);
    if (led_9 === "OFF") {
      console.log("LED9 " + led_9);
    } else if (led_9 === "ON") {
      initial_posI = initial_led_pos[3];
      blinkLEDs = setInterval(startI, 1000 / fps);
      console.log("LED9 " + led_9);
    }
  });

  socket.on('J', function(led_10) {
    clearInterval(blinkLEDs);
    if (led_10 === "OFF") {
      console.log("LED10 " + led_10);
    } else if (led_10 === "ON") {
      initial_posJ = initial_led_pos[4];
      blinkLEDs = setInterval(startJ, 1000 / fps);
      console.log("LED10 " + led_10);
    }
  });

  socket.on('K', function(led_11) {
    clearInterval(blinkLEDs);
    //function that tells strip1 to black out if a function in strip
    if (led_11 === "OFF") {
      console.log("LED11 " + led_11);
    } else if (led_11 === "ON") {
      initial_posK = initial_led_pos[5];
      blinkLEDs = setInterval(startK, 1000 / fps);
      console.log("LED11 " + led_11);
    }
  });
});
