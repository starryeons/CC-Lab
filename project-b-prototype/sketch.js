
let character;
let ai = [];
let clicked = false;
let talking = false;
let currentImage = 0;

async function setup() {
  createCanvas(1000, 600);
  imageMode(CENTER);

  //promises
  let promises = [];
  promises.push(loadImage("assets/base.jpg"));
  promises.push(loadImage("assets/clicked.jpg"));
  promises.push(loadImage("assets/angry.jpg"));
  promises.push(loadImage("assets/end.jpg"));

  //talk promises
  for (let i = 1; i <= 2; i++) {
    let filename = "assets/talk" + i + ".jpg";
    promises.push(loadImage(filename));}
  ai = await Promise.all(promises);

  // call  image
  character = new Sprite(ai);
}

function draw() {
  background(255);

// test shapes
  noStroke();
  fill(225, 200, 200);
  triangle(175, 50, 225, 75, 175, 100);

  fill(200, 225, 200);
  circle(200, 275, 50);

  fill(200, 200, 225);
  rectMode(CENTER);
  rect(200, 450, 50, 50);

// text
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Click here to speak", 400, 80);

  if (character) {
// hover over triangle
    if (!clicked && !talking) {
      if (mouseX > 175 && mouseX < 225 && mouseY > 50 && mouseY < 100) {character.changeSprite(1);} 
      else {character.changeSprite(0);}
    }

    // talking animation
    if (talking) {
      if (frameCount % 10 == 0) {
        if (currentImage < 1) {
          currentImage++;
        } else {
          currentImage = 0;}
      }
      character.changeSprite(4 + currentImage);
    }
    character.display();
  }
}

// mouse press expression change
function mousePressed() {

  // click circle
  if (dist(mouseX, mouseY, 200, 275) < 25) {
    character.changeSprite(2);
    clicked = true;
    talking = false;
  }

  // click square
  else if (mouseX > 175 && mouseX < 225 && mouseY > 425 && mouseY < 475) {
    character.changeSprite(3);
    clicked = true;
    talking = false;
  }

  // click text
  else if (mouseX > 300 && mouseX < 530 && mouseY > 70 && mouseY < 125) {
    talking = true;
    clicked = false;
    currentImage = 0;
  }

  // reset
  else {
    clicked = false;
    talking = false;
    currentImage = 0;
    character.changeSprite(0);
  }
}

// class
class Sprite {
  constructor(ai) {
    this.ai = ai;
    this.currentSprite = 0;
    this.x = width / 2;
    this.y = height / 2;
  }

  display() {
    // lagging movement IMPORTANT DONT CHANGE
    this.x = lerp(this.x, mouseX + 75, 0.02);
    this.y = lerp(this.y, mouseY + 75, 0.02);
    image(this.ai[this.currentSprite], this.x, this.y, 150, 150);
  }

  changeSprite(index) {
    this.currentSprite = index;
  }
}
