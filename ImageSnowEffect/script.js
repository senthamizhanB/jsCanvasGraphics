//Canvas and Contex
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "canvas"
));
const ctx = canvas.getContext("2d");

canvas.width = 581;
canvas.height = 676;

const image = new Image();
image.src = "photo1.png";

image.addEventListener("load", function () {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scannedData = scannedImage.data;

  //   console.log(scannedImage);
  //   for (let i = 0; i < scannedData.length; i += 4) {
  //     const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
  //     const average = total / 3;
  //     scannedData[i] = scannedData[i + 1] = scannedData[i + 2] = average;
  //   }
  //   scannedImage.data = scannedData;
  //   ctx.putImageData(scannedImage, 0, 0);

  //Image Mapping
  let mappedImage = [];
  for (let y = 0; y < scannedImage.height; y++) {
    let row = [];
    for (let x = 0; x < scannedImage.width; x++) {
      let red = scannedData[y * 4 * scannedImage.width + x * 4];
      let green = scannedData[y * 4 * scannedImage.width + x * 4 + 1];
      let blue = scannedData[y * 4 * scannedImage.width + x * 4 + 2];
      // let brightness = (red + blue + green) / 300;
      let brightness = calculateRelativeBrightness(red, green, blue);
      let cell = [(cellBrightness = brightness)];
      row.push(cell);
    }
    mappedImage.push(row);
  }
  // console.log(mappedImage);

  function calculateRelativeBrightness(red, green, blue) {
    return (
      Math.sqrt(
        red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
      ) / 100
    );
  }

  let particlesArray = [];
  const numberOfParticles = 8000;
  // const colorArray = [];

  class Particles {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 0.5;
      this.size = Math.random() * 0.5 + 1.5;
      this.postionX = Math.round(this.x);
      this.postionY = Math.round(this.y);
      // this.fillStyle=colorArray[Math.floor(Math.random()*colorArray.length)];
    }
    update() {
      this.postionX = Math.floor(this.x);
      this.postionY = Math.floor(this.y);
      this.speed = mappedImage[this.postionY][this.postionX][0];
      this.y += 2.6 - this.speed + this.velocity;
      if (this.y >= canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.globalAlpha = this.speed * 0.25;
      ctx.fillStyle = "white";
      ctx.arc(this.x, this.y, this.size, 0, Math.PI);
      // ctx.rect(this.x,this.y,3,3)
      ctx.fill();
    }
  }
  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particles());
    }
  }
  init();
  function animate() {
    ctx.globalAlpha=0.05;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
