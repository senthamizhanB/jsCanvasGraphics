function mainAnimation() {
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
  particlesRender()
  mouseTrailRender()
  requestAnimationFrame(mainAnimation);
}

mainAnimation();
