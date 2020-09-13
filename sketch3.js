let x = 450;
let speed = 3;
let z = 0;

//keyPressed();

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255,100,180);
    z = windowWidth;
}


function draw() {
    ellipse(x,mouseY,100,100);
    stroke(22);

    if (x > width || x < 50){
        speed = -speed;
    }
    x = x+speed;

    if (mouseIsPressed){
        fill(255,100,180,20);
    }
    print(z);
}



// function keyPressed(){
//     if (value = 1){
//         saveCanvas('images/01','png');
//     }
// }

