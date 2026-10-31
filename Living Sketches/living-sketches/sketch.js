let clownImg = [];
let currentImage = 0;

async function setup() {
  createCanvas(700, 700);

  frameRate(5);
  let promises = [];
  for (let i = 1; i <= 20; i++) {
    let filename = "asset/clown" + i + ".png";
    promises.push(loadImage(filename));
  }
  clownImg = await Promise.all(promises);
}

function draw() {
  background(90, 20, 75);
  imageMode(CENTER);

  image(clownImg[currentImage], width/2, height*.75);
  if (currentImage < 20) {
    currentImage++;
  } else {
    currentImage = 0;
  }
}











// IMAGE PROCESSING FUNCTIONS
// You shouldn't need to modify these helper functions:
function crop(images, x, y, width, height) {
  const croppedImages = [];

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    croppedImages.push(images[imageIndex].get(x, y, width, height));
  }

  return croppedImages;
}

function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned :D
}
