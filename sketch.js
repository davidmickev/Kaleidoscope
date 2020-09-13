// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;   

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

let play = true;

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
  background(127);

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
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 2, 0.1);

  // Setting up the slider for sleep() function
  sleepSlider = createButton('Sleep (Draw Update) Slider');
  sleepTime = createSlider(0,5000,10,10);
  
}

// Save File Function
function saveFile() {
  save('fractal.jpg');
}

// Clear Screen function
function clearScreen() {
  background(127);
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
  if (keyCode = 80){
    play = !play;
  }
}

function draw() {

  // Debug
  //print(sleepTime);
  
  // Lazy pause method
  if (play){

  sleep(sleepTime);
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;


    // let from = color(218, 165, 32);
    // let to = color(72, 61, 139);
    let from = color(218, 165, 32,.9);
    let to = color(72, 61, 139,.9);

    if (amt>=1.0){
      amt = 0.0;
    }
    amt += .01;

    // With each cycle, increment xoff
    xoff += xincrement;
    
    
      for (let i = 0; i < symmetry; i++) {
        let n = noise(xoff) * width;

        if (mouseIsPressed) {symmetry++}

        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);

        //line(mx, my, pmx, pmy);
        //sphere(mx, my, 4);
        // ellipse(n,my,20,20);
        // fill(100);

        fill(lerpColor(from,to,amt));
        ellipse(n/2, n / 2, mx, my);
        push();

        scale(1, -1);
        //line(n, my, pmx, pmy);
        //noStroke();

        //sphere(mx, my, 4);

        fill(lerpColor(from,to,amt));
        ellipse(n /2, n / 2, mx, my);
        // ellipse(n,my,20,20);
        // fill(100);
        pop();
      }
  }
}
}
