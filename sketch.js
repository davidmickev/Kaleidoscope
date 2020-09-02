let x = 450;
let speed = 3;
let z = 0;

//keyPressed();

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255,100,180);
    z = windowWidth;
}

function randColor() {
    return String("#" + Math.floor(Math.random() * 16777215).toString(16));
  }

  Array.from(document.getElementsByClassName('letter')).forEach(letter => {
    letter.addEventListener("mouseover", (e) => {
      letter.classList.add("hovered")
      letter.style.color = randColor();
      letter.style.opacity = ".9";
    })
    letter.addEventListener("animationend", (e) => {
      letter.classList.remove("hovered")
    })
  })

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

