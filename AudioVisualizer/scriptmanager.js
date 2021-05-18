function animationManager() {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

//   container.addEventListener("click", function () {
//     audioElement.play();
//     animationLoop();
//   });

  audioElement.addEventListener("play", function () {
    if (!source) {
      init();
      animationLoop();
    }
  });

  audioFile.addEventListener("change", function () {
    var file = this.files;

    audioElement = document.getElementById("audio");

    audioElement.src = URL.createObjectURL(file[0]);

    //       if (!source) {
    //         //   audioElement.play();
    //         init();
    //       }
    // audioElement.pause()
    audioElement.load();
    // audioElement.play();

    //       animationLoop()
  });

  mouseTrailRender();
  requestAnimationFrame(animationManager);
}
animationManager();
