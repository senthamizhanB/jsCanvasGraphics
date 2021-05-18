function mainAnimation() {
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    mouseTrailRender()
    particlesRender()
  requestAnimationFrame(mainAnimation);
}

mainAnimation();
