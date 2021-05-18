const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  "canvas"
));
const ctx = canvas.getContext("2d");

var maxLength = 12;
var angleChange = 7;
var baseAngle = 0;
var baseLength = 100;
var offsetX = 0;
var offsetY = 100;
var lengthChange = 0.8;
var baseWidth = 2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw(x, y, length, angle, width) {
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = width;
  ctx.strokeStyle = "white";
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();
  if (length < maxLength) {
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(0, -length, 10, 0, Math.PI /2);
    ctx.fill();
    ctx.restore();
    return;
  }
  draw(0, -length, length * lengthChange, angle + angleChange, width - 0.2);
  draw(0, -length, length * lengthChange, angle - angleChange, width - 0.2);
  ctx.restore();
}
draw(
  canvas.width / 2,
  canvas.height - offsetY,
  baseLength,
  baseAngle,
  baseWidth
);


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});