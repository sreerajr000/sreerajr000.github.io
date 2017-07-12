function setup() {
  var canv = createCanvas(0.98*windowWidth, windowHeight);
  canv.class("canvasbg");
  createCircle();
  //frameRate(10);

}

function windowResized() {
  resizeCanvas(0.98*windowWidth, windowHeight);
  createCircle();
}

var circles = [];
var Circle = function() {
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.op = random(255);
  this.size = random(8);
  this.interval = Math.floor(random(30, 60));
  this.counter = this.interval;
  this.direction = [0, 0];
  this.draw = function() {
    fill(255, 255, 255, this.op);
    ellipse(this.x, this.y, this.size, this.size);
  }
};

function createCircle() {
  circles = [];
  for (var i = 0; i < 200*(windowHeight*windowWidth)/(670*1370); i++) {
    var angle = random(0, TWO_PI);
    circles.push(new Circle());
    circles[i].direction = [cos(angle), sin(angle)];
  }
}

function draw() {
  background(255);
  var rad = 150;
  var x = mouseX;
  var y = mouseY + 50;
  var tempcircles = [];
  for (var i = 0; i < circles.length; i++) {
    circles[i].counter--;
    if (circles[i].counter == 0) {
      circles[i].counter = circles[i].interval;
      var angle = random(0, TWO_PI);
      circles[i].direction = [cos(angle), sin(angle)];
    }
    circles[i].x += (1 * circles[i].direction[0]);
    circles[i].y += (1 * circles[i].direction[1]);

    if (dist(x, y, circles[i].x, circles[i].y) <= rad) {
      circles[i].draw();
      tempcircles.push(circles[i]);
    }
  }
  for (var i = 0; i < tempcircles.length; i++) {
    for (var j = i + 1; j < tempcircles.length; j++) {
      if (dist(tempcircles[j].x, tempcircles[j].y, tempcircles[i].x, tempcircles[i].y) <= rad) {
        stroke(0, 0.8*min(tempcircles[i].op, tempcircles[j].op));
        line(tempcircles[i].x, tempcircles[i].y, tempcircles[j].x, tempcircles[j].y)
      }
    }
  }
}