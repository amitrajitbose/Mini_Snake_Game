var s;
var scl = 10;
var food;

//Function to set up the canvas and its dimensions too
function setup() {
  createCanvas(640, 480);
  alert("Welcome To The Mini Snake Game\Developed By Amitrajit Bose\n\nUse Arrows to Navigate\nPress P to Pause")
  s = new Snake();
  frameRate(10);
  pickLocation();

}

//Function to pick a location randomly on the canvas
function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

//Function to respond to mouse press
function mousePressed() {
  s.total++;
}

//Basic function to draw the food on canvas
function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 255,0);
  rect(food.x, food.y, scl, scl);
}



//var paused=1;
//Function to respond to user's arrow key press
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
    //paused=1;
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
    //paused=1;
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
    //paused=1;
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
    //paused=1;
  }
  else if (keyCode === 80) {
    //s.dir(0, 0);
    alert("PAUSED! Press Enter To Start Again");
  }
}

//Main Function for the snake body
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        alert("GAME OVER! Press Enter To Start Again");
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}
