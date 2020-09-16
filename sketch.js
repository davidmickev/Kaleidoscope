// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;
let angle = 360 / symmetry;

let play = true;
// T = Triangles, E = Elipses, R = Rectangles,

let e = false;
let t = false;
let r = false;
let v = true;

let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

// noise functionality TODO: slider?
let xoff = 0.0;
let xincrement = 0.01;

//for lerp color
let amt = 0.0;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  background('white');

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Stroke Brush Size');
  sizeSlider = createSlider(1, 32, 2, 0.1);

  // Setting up the slider for sleep() function
  sleepSlider = createButton('Sleep (Draw Update)');
  sleepTime = createSlider(0, 200, 20, 2);

  strokeSlider = createButton('Stroke Border Opacity');
  strokeOuter = createSlider(0, 125, 70, 1);

  strokeStartSlider = createButton('Fill Opacity(start)');
  strokeStart = createSlider(0, 125, 30, 1);

  strokeEndSlider = createButton('Fill Opacity(end)');
  strokeEnd = createSlider(0, 125, 100, 1);

  colorSlider = createButton('Color Change Rate');
  colorAmount = createSlider(0, .1, .025, .005);

  noiseSlider = createButton('xNoise');
  xoffAmount = createSlider(0, 1, 0, .005);

  noiseSlider2 = createButton('Noise Incriment');
  noiseIncriment = createSlider(0, 1, .01, .01);
}

// Save File Function
function saveFile() {
  save('fractal.jpg');
}

// Clear Screen function
function clearScreen() {
  background('white');
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function keyPressed() {
  // T = Triangles, E = Elipses, R = Rectangles,

  if (keyCode == 80) { // p - pause
    play = !play;
  }
  //symmetry 
  else if (keyCode == 90) { // z
    symmetry += 1;
    angle = 360 / symmetry;
  }
  else if (keyCode == 88) { // x
    if (symmetry > 3) {
      symmetry -= 1;
      angle = 360 / symmetry;
    }
  }
  else if (keyCode == 69) { // e
    e = !e;
  }
  else if (keyCode == 82) { // r
    r = !r;
  }
  else if (keyCode == 84){ // t
    t = !t;
  }
  else if (keyCode == 65){ // a
    e = true;
    r = true;
    t = true;
    v = true;
  }
  else if (keyCode == 65){ // a
    e = false;
    r = false;
    t = false;
    v = false;
  }
}

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return [r, g, b];
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();

  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  //stroke(speed);
  ellipse(x, y, speed, speed);
}

var randomRgb = getRandomRgb();
var randomRgb2 = getRandomRgb();
var randomRgb3 = getRandomRgb();

function draw() {
  if (play) {
    sleep(sleepTime.value());
    translate(width / 2, height / 2);

    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let mx = mouseX - width / 2;
      let my = mouseY - height / 2;
      let pmx = pmouseX - width / 2;
      let pmy = pmouseY - height / 2;

      //random color and all opacities
      let from = color(randomRgb2[0], randomRgb2[1], randomRgb2[2], strokeStart.value());
      let to = color(randomRgb3[0], randomRgb3[1], randomRgb3[2], strokeEnd.value());

      if (amt >= 1.0) {
        amt = 0.0;
        randomRgb = getRandomRgb();
        randomRgb2 = getRandomRgb();
        randomRgb3 = getRandomRgb();
      }
      amt += colorAmount.value();

      let n = noise(xoff) * width; 

      // With each cycle, increment xoff
      xoff += xincrement;
      
      print("real: "+ xoff + "and: ", xincrement);
      //if(xoff )
      
      // IMAGE Draw
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        strokeWeight(sizeSlider.value());
        stroke(randomRgb[0], randomRgb[1], randomRgb[2], strokeOuter.value());
        fill(lerpColor(from, to, amt));

        // SHAPES
        if (mouseIsPressed) {
          line(mx, my, pmx, pmy);
        }
        if(e){
          ellipse(n/2, n/2, mx, my);
        }
        if(t){
          triangle(mx, 180, mx, 390, my, 290);
        }
        if(r){
          rect(n/2, n/2, mx, my);
        }
        if(v){
          variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
        }

        push();
        scale(1, -1);
        fill(lerpColor(from, to, amt));

        // SHAPES
        if (mouseIsPressed) {
          line(mx, my, pmx, pmy);
        }
        if(e){
          ellipse(n / 2, n / 2, mx, my);
        }
        if(t){
          triangle(mx, 180, mx, 390, my, 290);
        }
        if(r){
          rect(n/2, n/2, mx, my);
        }
        if(v){
          variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
        }
        pop();
      }
    }
  }
}