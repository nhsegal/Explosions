let block1;
let block2;
let spring;
let slider1m;
let slider2m;
let sliderSpring;
let setting;
let Usp;

let button;
let running;

function setup() {
  createCanvas(800, 400);

  rectMode(CENTER);
  slider1m = createSlider(0.1, 10.0, 1, 0.1);
  slider1m.position(10, 10);
  slider1m.style("width", "220px");

  slider2m = createSlider(0.1, 10.0, 1, 0.1);
  slider2m.position(10, 30);
  slider2m.style("width", "220px");
  slider2m.style("color", color(100, 220, 200));

  sliderSpring = createSlider(1, 3, 1, 1);
  sliderSpring.position(10, 50);
  sliderSpring.style("width", "220px");
  
  button = createButton("Run");
  button.position(10, height - 50);
  button.size(100, 40);
  button.style("font-size", "20px");
  button.style("background-color", color(100, 220, 200));
  button.mousePressed(go);

  block1 = new Block(1, width / 2 - 60, 0);
  block2 = new Block(1, width / 2 -10, 0);
  spring = new Spring();

  running = false;
  setting = 4-sliderSpring.value();
}

function draw() {
  background(220);
  textSize(20);
  textAlign(LEFT, CENTER);
  textSize(16);
  text("Block 1 Mass", 240, 20);
  text("Block 2 Mass", 240, 40);
  text("Spring Setting", 240, 60);

  if (running != true) {
    block1.m = slider1m.value();
    block2.m = slider2m.value();
    setting = 4-sliderSpring.value();
    block1.x = width / 2 - 60- 14*setting;
    block2.x = width / 2 + 40;
    Usp = (5-setting)**2;
  }

  block1.display();
  spring.display();
  block2.display();
  textSize(20);
  text(round(block1.v,2) + " m/s", width/2-65-setting*14, (2 * height) / 3 - 70);
  text(round(block2.v,2) + " m/s", width/2+45, (2 * height) / 3 - 70);
 

  if (running == true) {
    setting = 4;
    block1.v = -sqrt(Usp/(.5*block1.m+ 0.5*block1.m*block1.m/block1.m))
    block2.v = -(block1.m/block2.m)*block1.v
    block1.move();
    block2.move();
  }
}

class Block {
  constructor(m, x, v) {
    this.x = x;
    this.m = m;
    this.v = v;
    this.vold = v;
    this.size = 100;
  }
  move() {
    this.x += this.v;
  }
  display() {
    textAlign(CENTER, CENTER);
    textSize(28);
    rect(this.x, (2 * height) / 3, this.size, this.size);
    text(this.m + " kg", this.x, (2 * height) / 3);
  }
}

class Spring {
  constructor() {
  }
  display() {
    for (let i = 0; i < 8; i++) {
      ellipse(block1.x+50+i*2*setting, 2*height/3, 20, 40);
    }
  }
}

function go() {
  if (running) {
    button.html("Run");
    block1.x = width / 2 - 60;
    block2.x = width / 2 + 20;
    block1.v= 0;
    block2.v= 0;
    setting = 4;
  } else {
    button.html("Reset");
  }
  running = !running;
}
