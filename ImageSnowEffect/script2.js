const canvas = /**@type {HTMLCanvasElement}*/ (document.getElementById(
  "canvas"
));
const ctx = canvas.getContext("2d");
canvas.width = 581;
canvas.height = 676;

var particles = [];
// var numerOfParticles = 1000;
// var adjustX = -60;
// var adjustY = 10;
// var scaleX = 2;
// var scaleY = 2;

const mouse = {
  x: null,
  y: null,
  radius: 100,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// ctx.font = "30px verdana";
ctx.fillStyle = "white";
// ctx.fillText("SENTHAMIZHAN", 100, 200);
const image = new Image();
image.src = "photo1.png";
image.addEventListener("load", function () {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() + 1;
    }
    update() {
      this.dx = this.x - mouse.x;
      this.dy = this.y - mouse.y;
      this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.directionX =
        ((mouse.radius - this.distance) * this.dx) / this.distance;
      this.directionY =
        ((mouse.radius - this.distance) * this.dy) / this.distance;
      if (this.distance < mouse.radius) {
        this.x += this.directionX * this.density;
        this.y += this.directionY * this.density;
      } else {
        if (this.x != this.baseX) {
          let dx = this.baseX - this.x;
          this.x += dx / 10;
        }

        if (this.y != this.baseY) {
          let dy = this.baseY - this.y;
          this.y += dy / 10;
        }
      }
    }
    draw() {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    //   connect();
    requestAnimationFrame(animate);
  }

    // console.log(pixelData);

  let mappedImage = [];
  for (let y = 0; y < pixelData.height; y++) {
    let row = [];
    for (let x = 0; x < pixelData.width; x++) {
      let red = pixelData.data[y * 4 * pixelData.width + x * 4];
      let green = pixelData.data[y * 4 * pixelData.width + x * 4 + 1];
      let blue = pixelData.data[y * 4 * pixelData.width + x * 4 + 2];
      let brightness = (red + blue + green) / 3;
      //   let brightness = calculateRelativeBrightness(red, green, blue);
      //   console.log(red);
      let cell = [(cellBrightness = brightness)];
      row.push(cell);
    }
    mappedImage.push(row);
    // console.log(1)
  }

  //   console.log(mappedImage);
  //   console.log(ImageData)
  init();
  animate();
  function init() {
    for (let y = 0; y < pixelData.height; y++) {
      for (let x = 0; x < pixelData.width; x++) {
        if (mappedImage[y][x][0] > 100) {
          particles.push(new Particle(x, y));
        }
      }
    }
  }

  // randomParticles();
  function calculateRelativeBrightness(red, green, blue) {
    return (
      Math.sqrt(
        red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
      ) / 100
    );
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function randomParticles() {
    for (let i = 0; i < numerOfParticles; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
  }
});
// ctx.strokeStyle="white";
// ctx.strokeRect(0,0,500,100)

//Particles Class
