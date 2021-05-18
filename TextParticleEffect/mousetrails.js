// const canvas = /**@type {HTMLCanvasElement} */ (document.getElementById(
//   "canvas"
// ));
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


let mouseTrails = [];
let mouseTrailsNumber = 50;

// let mouse = {
//   x: undefined,
//   y: undefined,
// };

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class MouseTrails {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.velocityX = Math.random() * 2;
    this.velocityY = Math.random() * 2;
    this.bounsiness = 1;
    this.lifeTime = 0;
    this.lifeSpan=Math.random()/10+0.01;
    this.trailColor =
      "rgb(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      ",1)";
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.lifeTime -= this.lifeSpan;
    if (this.lifeTime <= 0) {
      this.x = mouse.x;
      this.y = mouse.y;
      this.velocityY = Math.random() * 2;
      this.velocityX = Math.floor(Math.random()*4-2);
      this.size = 2;
      this.lifeTime = Math.random()*4+1;
    }
    if (this.y <= 0 || this.y >= canvas.height) {
      this.velocityY = -this.velocityY * this.bounsiness;
    }
    if (this.x <= 0 || this.x >= canvas.width) {
      this.velocityX = -this.velocityX * this.bounsiness;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,0.8)";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < mouseTrailsNumber; i++) {
    mouseTrails.push(new MouseTrails(canvas.width/2,canvas.height/2));
  }
}

function animationLoop() {
  ctx.fillStyle = "rgba(0,0,0,1)";
  mouseTrailRender()
  requestAnimationFrame(animationLoop);
}

function mouseTrailRender(){
ctx.fillRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < mouseTrailsNumber; i++) {
  mouseTrails[i].update();
  mouseTrails[i].draw();
}
connectTrails();
}

// window.addEventListener("mouseenter",function(){
//     init()
// })
init();

setInterval(function(){
    mouse.x=mouse.y=undefined;
},500)
// console.log(mouseTrails)
// animationLoop();

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});


function connectTrails(){
  for(let i=0;i<mouseTrailsNumber;i++){
    for(let j=i+1;j<mouseTrailsNumber;j++){
      let dx = mouseTrails[i].x - mouseTrails[j].x;
      let dy = mouseTrails[i].y - mouseTrails[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 80) {
        ctx.strokeStyle = mouseTrails[i].trailColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mouseTrails[i].x, mouseTrails[i].y);
        ctx.lineTo(mouseTrails[j].x, mouseTrails[j].y);
        ctx.stroke();
      }
    }
  }
}