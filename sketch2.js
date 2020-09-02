let x = 0;
let speed = 3;

var ball = {
  x : 300,
  y : 200,
  xspeed: 4,
  yspeed: -3
}

function setup() {
  createCanvas(400,400);
  // put setup code here
}

function draw() {
  background(100,100,100);
  fill(20,30,100);

  //rect(x,100,100,100);
  elipse(ball.x,ball.y,24,24);
  
  if (ball.x > width || ball.x < 0){
    ball.xspeed = balll.xspeed * -1;
  }

  if (ball.y > height || ball.y < 0){
    ball.yspeed = ball.yspeed * -1;
  }

  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;

  // x = x + speed;
  // if (x + 100 > width){
  //   speed = (-1*speed);
  // }

}