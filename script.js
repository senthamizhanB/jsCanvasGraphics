const canvas = /**@type {HTMLCanvasElement}*/ (document.getElementById(
  "canvas"
));
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];
var numerOfParticles = 500;
var adjustX = -60;
var adjustY = 10;
var scaleX = 2;
var scaleY = 2;
var connectDistance=85;

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
// ctx.fillStyle = "white";
// ctx.fillText("SENTHAMIZHAN", 100, 200);
// ctx.strokeStyle="white";
// ctx.strokeRect(0,0,500,100)
// const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 4;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() + 1;
    this.fillStyle
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
    ctx.fillStyle ="rgba(255,0,0,0.2)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  for (let y = 0; y < pixelData.height; y++) {
    for (let x = 0; x < pixelData.width; x++) {
      if (pixelData.data[y * pixelData.width * 4 + x * 4 + 3] > 128) {
        particles.push(
          new Particle((x - adjustX) * scaleX, (y + adjustY) * scaleY)
        );
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
    connect();
  requestAnimationFrame(animate);
}

randomParticles();
// init();
animate();

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < connectDistance) {
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
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
      new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
