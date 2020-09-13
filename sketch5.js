
let snowflakes = []; // array to hold snowflake objects
let xoff = 0.0;
let xincrement = 0.01;

function randColor() {
  
  return Math.floor(Math.random() * 255);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //colorMode(HSB, width, height, 100);
    fill(240);
    noStroke();
}

function draw() {
  print (Math.floor(Math.random() * 255));
  background('black');
  let t = frameCount / 300; // update time

 

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }



  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));
  

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
    
  };

  this.display = function() {
    let n = noise(xoff) * width;
    ellipse(this.posX, this.posY, this.size);
    //fill(255,100,180,20);
    fill(255,255,0);
  };
}
