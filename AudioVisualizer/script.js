const canvas = /**@type {HTMLCanvasElement} */ (document.getElementById(
  "canvas"
));
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var audioFile = document.getElementById("audiofile"),
  audioElement;
var audioElement = document.getElementById("audio");
var audioCtx ;
var analyser;
var data;
var source;

var offsetX=100;


function animationLoop() {
  audioElement.play();

  requestAnimationFrame(animationLoop);

  analyser.getByteFrequencyData(data);
  draw();
}

function init() {
  audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  source = audioCtx.createMediaElementSource(audioElement);
  source.connect(analyser);
  source.connect(audioCtx.destination);
  data = new Uint8Array(analyser.frequencyBinCount);
}

function draw() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data.forEach((value, i) => {
    ctx.save();
    ctx.translate(canvas.width / 2+offsetX, canvas.height / 2);
    ctx.rotate(i + Math.PI / data.length);
    let barheigth = value;
    let barwidth = 10;
    let hue = i * 2;
    let lightness = (barheigth / 255) * 110;
    let hsl = "hsl(" + hue + ",100%," + lightness + "%)";
    ctx.fillStyle = hsl;
    ctx.fillRect(0, 0, barwidth, barheigth);
    ctx.restore();
  });
}


audioFile.addEventListener("change", function () {
  if(!source){
    init();
  }
  var file = this.files;

  audioElement = document.getElementById("audio");

  audioElement.src = URL.createObjectURL(file[0]);
  
  animationLoop();
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


var count=1;