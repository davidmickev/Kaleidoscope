// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;

let play = true;

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

// noise functionality TODO: slider?
let xoff = 0.0;
let xincrement = 0.01;

//for lerp color
let amt = 0.0;
let colorPallets = [
  ["#4C5B5C", "#FF715B", "#F9CB40", "#BCED09", "#2F52E0"],
  ["#0D1821", "#344966", "#E6AACE", "#F0F4EF", "#BFCC94"],
  ["#BFCC94", "#F7717D", "#DE639A", "#7F2982", "#16001E"],
  ["#16001E", "#BDADEA", "#BEA2C2", "#A37871", "#4E4B5C"],
  ["#2E4939", "#4CAF9C", "#F4994B", "#F44731", "#7B1516"],
];

function setup() {
  createCanvas(920, 920);
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
  if (keyCode = 80) {
    play = !play;
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
  // Lazy pause method
  if (play) {

    print("sleep: ", +sleepTime);

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
        this.randomRgb = getRandomRgb();
        this.randomRgb2 = getRandomRgb();
        this.randomRgb3 = getRandomRgb();
      }

      amt += .025;
      // With each cycle, increment xoff
      xoff += xincrement;

      // IMAGE Draw
      for (let i = 0; i < symmetry; i++) {
        let n = noise(xoff) * width; //hmmmm

        // if (mouseIsPressed) {
        //   //this.symmetry++
        // }

        rotate(angle);
        strokeWeight(sizeSlider.value());
        stroke(randomRgb[0], randomRgb[1], randomRgb[2],strokeOuter.value());

        // SHAPES

        fill(lerpColor(from, to, amt));

        if (mouseIsPressed) {
          line(mx, my, pmx, pmy);
        }

        ellipse(n / 2, n / 2, mx, my);
        //rect(n/2, n/2, mx, my);
        //triangle(pmx+pmy+100,pmx+pmy+100,pmx+pmy+100,pmx+pmy+100,pmx+pmy+100,pmx+pmy+100)
        //triangle(mx+my,mx+my,mx+my,mx+my,mx+my,mx+my)
        //triangle(x1, y1, x2, y2, x3, y3)
        variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
        //variableEllipse(mouseX/2, mouseY/2, pmouseX/2, pmouseY/2);

        push();

        scale(1, -1);
        fill(lerpColor(from, to, amt));

        // SHAPES

        if (mouseIsPressed) {
          line(mx, my, pmx, pmy);
        }

        ellipse(n / 2, n / 2, mx, my);
        // triangle(pmx+pmy,pmx+pmy,pmx+pmy,pmx+pmy,pmx+pmy,pmx+pmy)
        // rect(n/2, n/2, mx, my);
        //variableEllipse(mouseX/2, mouseY/2, pmouseX/2, pmouseY/2);
        variableEllipse(mouseX, mouseY, pmouseX, pmouseY);

        pop();
      }
    }
  }
}