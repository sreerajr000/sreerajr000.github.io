function setup() {
  var myCanvas = createCanvas(240, 432);
  myCanvas.parent("canvasdiv")
  cW = width;
  cH = height;
  drawingContext.shadowBlur = 3;
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowColor = "black";
}

function draw() {
  frameRate(speed);
  background(240);
  rectMode(CENTER);
  drawFrame();
  currentBlk.draw();
  currentBlk.y++;
  if (currentBlk.checkCollision()) {
    currentBlk.addtoFrame();
    currentBlk = new block();
    speed = 1;
    if (currentBlk.checkCollision()) {
      noLoop();
      $('#myModal').modal();
      var stats = select("#modelP");
      stats.html('Your Score is ' + playerScore);
      frame = zeroarray([18, 10]);
      playerScore = 0;
    }
  }
  checkClear();
}

var newframe;
var ct;
var playerScore = 0;

function checkClear() {
  ct = 0;
  var f;
  newframe = zeroarray([18, 10]);
  var p = 17;
  for (var i = 17; i >= 0; i--) {
    f = false;
    for (var j = 0; j < frame[i].length; j++) {
      if (frame[i][j] == 0) {
        f = true;
      }
    }
    if (f) {
      ct++;
      newframe[p] = frame[i];
      p--;
    }
  }
  playerScore += (18 - ct) * 10;

  var para = select("#wellP");
  para.html("Player Score : <strong>" + playerScore + '</strong>');

  frame = [
    []
  ];
  frame = zeroarray([18, 10]);
  for (var i = 0; i < newframe.length; i++)
    for (var j = 0; j < newframe[i].length; j++)
      frame[i][j] = newframe[i][j];
}

function deleteRow(arr, row) {
  arr = arr.slice(0);
  arr.splice(row - 1, 1);
  return arr;
}

function moveSide() {
  background(240);
  rectMode(CENTER);
  drawFrame();
  currentBlk.draw();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    currentBlk.x--;
    currentBlk.y--;
    if (currentBlk.checkCollision()) currentBlk.x++;
    else moveSide();

  } else if (keyCode === RIGHT_ARROW) {
    currentBlk.x++;
    currentBlk.y--;
    if (currentBlk.checkCollision()) currentBlk.x--;
    else moveSide();

  } else if (keyCode === DOWN_ARROW) {
    speed = 10;
    draw();
    return false;
  } else if (keyCode === UP_ARROW) {

    currentBlk.rotateBlk();
    if (currentBlk.checkCollision()) currentBlk.urotateBlk();
    return false;
  }
}


function keyPressedAlt(code) {
  if (code === 0) {
    currentBlk.x--;
    //currentBlk.y--;
    if (currentBlk.checkCollision()) currentBlk.x++;
    else moveSide();

  } else if (code === 1) {
    currentBlk.x++;
    //currentBlk.y--;
    if (currentBlk.checkCollision()) currentBlk.x--;
    else moveSide();

  } else if (code === 2) {
    speed = 10;
    draw();
  } else if (code === 3) {

    currentBlk.rotateBlk();
    if (currentBlk.checkCollision()) currentBlk.urotateBlk();
    return false;
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW)
    speed = 1;
  draw();
}



var block = function() {
  this.x = 4;
  this.y = 0;
  this.blockid = Math.floor(Math.random() * 7);
  this.orient = 0;

  this.draw = function() {
    fill(cols[this.blockid + 1]);
    for (var i = 0; i < blocks[this.blockid][this.orient].length; i++) {
      for (var j = 0; j < blocks[this.blockid][this.orient][i].length; j++) {
        if (blocks[this.blockid][this.orient][i][j])
          rect(24 * (j + this.x) + 12, 24 * (i + this.y) + 12, 24, 24);
      }
    }
  }

  this.rotateBlk = function() {
    this.y--;
    this.orient = (++this.orient) % (blocks[this.blockid].length);
  }

  this.urotateBlk = function() {
    if (this.orient == 0) this.orient = blocks[this.blockid].length - 1;
    else
      this.orient = (--this.orient) % (blocks[this.blockid].length);
  }
  this.checkCollision = function() {
    var blk = blocks[this.blockid][this.orient];
    //check sides
    for (var i = 0; i < blk.length; i++) {
      for (var j = 0; j < blk[i].length; j++) {
        if (blk[i][j]) {
          if (this.x + j < 0 || this.x + j > 9)
            return true;
        }
      }
    }

    for (var i = 0; i < blk.length; i++) {
      for (var j = 0; j < blk[i].length; j++) {
        if (blk[i][j]) {
          if (this.y + i > 17)
            return true;
        }
      }
    }

    for (var i = 0; i < blk.length; i++) {
      for (var j = 0; j < blk[i].length; j++) {
        if (blk[i][j])
          if (frame[this.y + i][this.x + j] > 0)
            return true;
      }
    }
    return false;
  }

  this.addtoFrame = function() {
    this.y--;
    var blk = blocks[this.blockid][this.orient];
    for (var i = 0; i < blk.length; i++) {
      for (var j = 0; j < blk[i].length; j++) {
        if (blk[i][j]) {
          frame[this.y + i][this.x + j] = blk[i][j];
        }
      }
    }
  }
}

var speed = 1;
var currentBlk = new block();
var cW, cH;
var cols = ["", "purple", "cyan", "yellow", "orange", "blue", "red", "green"];
var blocks = [
  [
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  ],
  [
    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0]
    ]
  ],
  [
    [
      [3, 3],
      [3, 3]
    ]
  ],
  [
    [
      [0, 4, 0],
      [0, 4, 0],
      [0, 4, 4]
    ],
    [
      [0, 0, 0],
      [0, 0, 4],
      [4, 4, 4]
    ],
    [
      [0, 4, 4],
      [0, 0, 4],
      [0, 0, 4]
    ],
    [
      [4, 4, 4],
      [4, 0, 0],
      [0, 0, 0]
    ]
  ],
  [
    [
      [0, 5, 0],
      [0, 5, 0],
      [5, 5, 0]
    ],
    [
      [0, 0, 0],
      [5, 0, 0],
      [5, 5, 5]
    ],
    [
      [5, 5, 0],
      [5, 0, 0],
      [5, 0, 0]
    ],
    [
      [5, 5, 5],
      [0, 0, 5],
      [0, 0, 0]
    ]
  ],
  [
    [
      [6, 6, 0],
      [0, 6, 6],
      [0, 0, 0]
    ],
    [
      [0, 6, 0],
      [6, 6, 0],
      [6, 0, 0]
    ]
  ],
  [
    [
      [0, 7, 7],
      [7, 7, 0],
      [0, 0, 0]
    ],
    [
      [7, 0, 0],
      [7, 7, 0],
      [0, 7, 0]
    ]
  ]
];


var frame = zeroarray([18, 10]);

function drawBlock(col, i, j) {
  fill(cols[col]);
  rect(24 * j + 12, 24 * i + 12, 24, 24);
}


function drawFrame() {
  for (var i = 0; i < frame.length; i++) {
    for (var j = 0; j < frame[i].length; j++) {
      if (frame[i][j])
        drawBlock(frame[i][j], i, j);
    }
  }
}


function zeroarray(dimensions) {
  var array = [];
  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? 0 : zeroarray(dimensions.slice(1)));
  }
  return array;
}

function closeModal() {
  loop();
}