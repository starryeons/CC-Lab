/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let color1;
let color2;
let r3=0
let g3=0
let b3=0
let r2=255
let g2=255
let b2=255

function setup() {
  createCanvas(800, 500);
  color1 = color(40, 255, 200);
  color2 = color(200, 50, 255);
  noStroke();
}

function draw() {
  background(10, 15, 35);
  //sea floor
  fill(204, 204, 255);
  rect(0, 360, 800, 140);
  //background crystals
  for (let x = 0; x < width; x += 25) {
    let h = noise(x * 0.02, 10) * 100;
    let c = lerpColor(color1, color2, noise(x * 0.02));
    fill(c);
    crystal(x, 380, h, 25);
  }
  //water details
  let numOfCircle = 30;
  strokeWeight(5);
  stroke(255, 255, 255, 50);
  for (let i = 0; i < 30; i++) {
    let dia = i * 70;
    noFill();
    circle(800, 0, dia);
  }
  strokeWeight(2);
  stroke(255, 0, 127, 150);
  for (let i = 0; i < 40; i++) {
    let dia = i * 50;
    noFill();
    circle(800, 0, dia);
  }
  //foreground crystals
  stroke(255, 255, 255, 50);
  for (let x = 0; x < width; x += 20) {
    let h = noise(x * 0.02, 20) * 160;
    let c = lerpColor(color1, color2, noise(x * 0.02 + 100));
    fill(c);
    crystal(x, 450, h, 35);
  }
}
//template
function crystal(x, y, h, w) {
  beginShape();
  vertex(x, y);
  vertex(x - w / 2, y - h * 0.6);
  vertex(x, y - h);
  vertex(x + w / 2, y - h * 0.6);
  endShape();

  //bubbles
  for (let i = 0; i < 15; i++) {
    let t = frameCount * 0.01;
    let x = noise(i * 10, t) * width;
    let y = noise(i * 10 + 100, t) * height;
    let size = 10 + noise(i * 10 + 200, t) * 25;
    fill(100, 200, 255, 50);
    circle(x, y, size);
  }

  //ventral fins outline
  let swim = sin(frameCount * 0.05) * 5;
  strokeWeight(10);
  stroke(255, 255, 255, 100);
  line(190, 270, 110 + swim, 280);
  line(190, 270, 150 + swim, 300);
  line(190, 270, 90 + swim, 310);

  //creature body
  noStroke();
  fill(153, 204, 255);
  triangle(100, 250, 500, 150, 500, 350);

  //creature skeleton
  stroke(255, 255, 255);
  strokeWeight(2);
  line(200, 250, 400, 250);
  line(390, 250, 380, 300);
  line(390, 250, 380, 200);
  line(365, 250, 350, 290);
  line(365, 250, 350, 210);
  line(340, 250, 320, 280);
  line(340, 250, 320, 220);
  line(315, 250, 290, 270);
  line(315, 250, 290, 230);
  line(290, 250, 240, 260);
  line(290, 250, 240, 240);

  //creature outer shell
  fill(153, 204, 255, 150);
  stroke(255, 255, 255, 100);
  strokeWeight(5);
  triangle(100, 250, 500, 150, 500, 350);

//clipping
  push()
clip(() => {triangle(100, 250, 500, 150, 500, 350);});
noStroke();
fill(r3, g3, b3);
r3 = lerp(r3, 255, 0.01);
g3 = lerp(g3, 255, 0.01);
b3 = lerp(b3, 255, 0.01);
let freq = frameCount * 0.99;
let amp = random(0, 100);
let sinValue = sin(freq) * amp;
let p = 100+frameCount;
let m = 250 + sinValue;
circle(p, m, 10);
pop();

  //side fin
  stroke(255, 255, 255, 100);
  strokeWeight(5);
  fill(153, 204, 255);
  drawSideFin();

  //creature head
  noStroke();
  fill(204, 229, 255);
  circle(500, 250, 200);

  //creature face
  fill(255, 104, 255, 50);
  circle(425, 250, 50); //cheek 1
  noFill();
  stroke(255, 0, 0, 50);
  strokeWeight(1);
  beginShape();
  for (let a = 0; a < PI * 3; a += 0.1) {
    let r = map(a, 0, PI * 3, 0, 23);
    let x = 425 + cos(a + frameCount * 0.02) * r;
    let y = 250 + sin(a + frameCount * 0.02) * r;
    vertex(x, y);
  }
  endShape();
  fill(255, 104, 255, 50);
  noStroke();
  circle(575, 250, 50); //cheek 2 starts here
  noFill();
  stroke(255, 0, 0, 50);
  strokeWeight(1);
  beginShape();
  for (let a = 0; a < PI * 3; a += 0.1) {
    let r = map(a, 0, PI * 3, 0, 23);
    let x = 575 + cos(a + frameCount * 0.02) * r;
    let y = 250 + sin(a + frameCount * 0.02) * r;
    vertex(x, y);
  }
  endShape();
  //end of cheek spirals
  noStroke();
  fill(0, 0, 0, 200);
  d = dist(mouseX, mouseY, 495, 110);
  let smile = map(d, 0, 300, 250, 150);
  smile = constrain(smile, 0, 170);
  let smileHeight = map(d, 0, 300, 100, 20);
  smileHeight = constrain(smileHeight, 20, 100);
  arc(500, 270, smile, smileHeight, 0, PI); //smile
  fill(0, 0, 0, 10);
  circle(560, 230, 75);
  circle(450, 230, 75);
  fill(0, 0, 0, 15);
  circle(560, 230, 65);
  circle(450, 230, 65);
  fill(0, 0, 0, 20);
  circle(560, 230, 55);
  circle(450, 230, 55);
  fill(255);
  circle(560, 230, 50);
  circle(450, 230, 50);
  fill(204, 229, 255, 100);
  let pupilX = constrain(map(mouseX, 510, 610, 555, 565), 555, 565);
  let pupilY = constrain(map(mouseY, 180, 280, 220, 235), 220, 235);
  circle(pupilX, pupilY, 40);
  circle(pupilX, pupilY, 40); //eyes
  strokeWeight(1);
  fill(0, 0, 0, 50);
  circle(pupilX, pupilY, 5);
  let pupilX2 = constrain(map(mouseX, 410, 460, 445, 455), 445, 455);
  let pupilY2 = constrain(map(mouseY, 180, 280, 220, 235), 220, 235);
  fill(204, 229, 255, 100);
  circle(pupilX2, pupilY2, 40);
  fill(0, 0, 0, 50);
  circle(pupilX2, pupilY2, 5);

  //magical
  let r1 = map(mouseX, 0, width, 0, 255);
  let g1 = map(mouseY, 0, height, 0, 255);
  let size = map(d, 0, 200, 150, 70);
  size = constrain(size, 70, 150);
  fill(r1, g1, 153, 100);
  noStroke();
  circle(495, 110, size);

  //creature back fins
  fill(204, 229, 255);
  strokeWeight(5);
  stroke(255, 255, 255, 100);
  beginShape();
  vertex(100, 250);
  vertex(20, 225);
  vertex(30, 250);
  vertex(20, 275);
  endShape();
  fill(255, 204, 255);
  strokeWeight(3);
  stroke(255, 255, 255, 100);
  drawTopFin(0, 0);
  drawBotFin(0, 0);

  //dorsal
  fill(153, 204, 255);
  stroke(255, 255, 255, 100);
  strokeWeight(3);
  beginShape();
  splineVertex(210, 222);
  splineVertex(210, 222);
  splineVertex(240 + swim * 0.3, 185);
  splineVertex(270 + swim * 0.7, 165);
  splineVertex(295 + swim, 185);
  splineVertex(330 + swim * 0.7, 193);
  splineVertex(350, 187);
  splineVertex(350, 187);
  endShape();

  //ventral fins
  stroke(153, 204, 255);
  strokeWeight(5);
  line(190, 270, 110 + swim, 280);
  line(190, 270, 150 + swim, 300);
  line(190, 270, 90 + swim, 310);

  //antennae
  noFill();
  strokeWeight(5);
  stroke(153, 204, 255);
  beginShape();
  splineVertex(515, 160);
  splineVertex(545, 150);
  splineVertex(485, 140);
  splineVertex(535, 130);
  splineVertex(495, 120);
  endShape();
  let r = map(d, 0, 200, 255, 0);
  let g = map(d, 0, 200, 0, 204);
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 204);
  fill(
    lerp(144, 255, 1 - d / 200),
    lerp(238, 0, 1 - d / 200),
    lerp(144, 0, 1 - d / 200)
  );
  noStroke();
  circle(495, 110, 30);

  //custom shapes
  function drawTopFin(x, y) {
    push();
    translate(100, 250);
    rotate(cos(frameCount * 0.02) * 0.5);
    triangle(0, 0, -80, -25, -70, 0);
    pop();
  }
  function drawBotFin(x, y) {
    push();
    translate(100, 250);
    rotate(sin(frameCount * 0.03) * 0.5);
    triangle(0, 0, -80, 25, -70, 50);
    pop();
  }
  function drawSideFin(x, y) {
    push();
    translate(350, 260);
    rotate(sin(frameCount * 0.03) * 0.5);
    beginShape();
    vertex(0, 0);
    vertex(25, 35);
    vertex(45, 65);
    vertex(40, 85);
    vertex(0, 100);
    vertex(-40, 85);
    vertex(-45, 65);
    vertex(-25, 35);
    endShape();
    pop();
  }
  if (mouseIsPressed) {
    noStroke();
    fill(0);
    rect(0, 0, 800); //black background
    fill(104, 129, 155); //head fading in
    circle(400, 250, 660);
    fill(129, 154, 180);
    circle(400, 250, 645);
    fill(154, 179, 205);
    circle(400, 250, 630);
    fill(179, 204, 230);
    circle(400, 250, 615);
    fill(204, 229, 255); //actual head color
    circle(400, 250, 600); //actual head
    fill(190, 219, 267); //start of mouth/bottom lip
    arc(400, 350, 500, 300, 0, PI);
    fill(0);
    arc(400, 335, 500, 290, 0, PI);
    fill(190, 219, 267);
    arc(400, 325, 500, 100, 0, PI);
    fill(204, 229, 255);
    arc(400, 310, 500, 100, 0, PI); //end of mouth/top lip shaping
    fill(255, 0, 0); //text
    textSize(30);
    text("i see you", 350, 425);
    fill(154, 179, 205); //eye shading
    arc(200, 205, 200, 120, PI, 0);
    arc(600, 205, 200, 120, PI, 0);
    fill(179, 204, 230);
    arc(200, 203, 200, 110, PI, 0);
    arc(600, 203, 200, 110, PI, 0);
    fill(255); //scleras
    arc(200, 200, 190, 100, PI, 0);
    arc(600, 200, 190, 100, PI, 0);
    push(); //iris clipping mask
    clip(() => {
      arc(200, 200, 190, 100, PI, 0);
    });
    fill(0);
    circle(200, 190, 130);
    pop();
    push();
    clip(() => {
      arc(600, 200, 190, 100, PI, 0);
    });
    fill(0);
    circle(600, 190, 130);
    pop();
    noFill(); //mouth wrinkles
    strokeWeight(3);
    stroke(170, 199, 247);
    beginShape();
    splineVertex(170, 320);
    splineVertex(125, 330);
    splineVertex(125, 360);
    endShape();
    beginShape();
    splineVertex(630, 320);
    splineVertex(685, 330);
    splineVertex(675, 360);
    endShape();
    beginShape(); //eyelids
    splineVertex(300, 160);
    splineVertex(270, 140);
    splineVertex(200, 130);
    splineVertex(150, 130);
    splineVertex(120, 150);
    endShape();
    beginShape();
    splineVertex(500, 160);
    splineVertex(530, 140);
    splineVertex(600, 130);
    splineVertex(650, 130);
    splineVertex(680, 150);
    endShape();
  }
  //multiply layer
  fill(0, 0, 102, 10);
  rect(0, 0, 800, 500);
}