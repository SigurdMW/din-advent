import React from "react"
/**
 * Confetti particle class
 * thanks to https://jsfiddle.net/hcxabsgh/
 *
 * ALT: https://jsfiddle.net/hcxabsgh/
 */
class ConfettiParticle {
  public color: number = 0
  public lightness: number = 50
  diameter: number = 0
  tilt: number = 0
  tiltAngleIncrement: number = 0
  tiltAngle: number = 0
  particleSpeed: number = 1
  waveAngle: number = 0
  x: number = 0
  y: number = 0

  constructor(
    public context: CanvasRenderingContext2D,
    public width: number,
    public height: number
  ) {
    this.reset()
  }

  reset() {
    this.lightness = 50
    this.color = Math.floor(Math.random() * 360)
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height - this.height
    this.diameter = Math.random() * 6 + 4
    this.tilt = 0
    this.tiltAngleIncrement = Math.random() * 0.1 + 0.04
    this.tiltAngle = 0
  }

  darken() {
    if (this.y < 100 || this.lightness <= 0) return
    this.lightness -= 250 / this.height
  }

  update() {
    this.waveAngle += this.tiltAngleIncrement
    this.tiltAngle += this.tiltAngleIncrement
    this.tilt = Math.sin(this.tiltAngle) * 12
    this.x += Math.sin(this.waveAngle)
    this.y += (Math.cos(this.waveAngle) + this.diameter + this.particleSpeed) * 0.4
    if (this.complete()) this.reset()
    this.darken()
  }

  complete() {
    return this.y > this.height + 20
  }

  draw() {
    let x = this.x + this.tilt
    this.context.beginPath()
    this.context.lineWidth = this.diameter
    this.context.strokeStyle = "hsl(" + this.color + ", 50%, " + this.lightness + "%)"
    this.context.moveTo(x + this.diameter / 2, this.y)
    this.context.lineTo(x, this.y + this.tilt + this.diameter / 2)
    this.context.stroke()
  }
}

/**
 * Setup
 */
const startConfetti = () => {
  if (!window) return
  let width = window.innerWidth
  let height = window.innerHeight
  let particles: ConfettiParticle[] = []

  // particle canvas
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) return
  canvas.id = "particle-canvas"
  canvas.width = width
  canvas.height = height
  canvas.setAttribute(
    "style",
    "position:fixed;z-index: -1; top: 0; bottom: 0; left: 0; right: 0; pointer-events: none;"
  )
  document.body.appendChild(canvas)

  // change body bg color
  const changeBgColor = () => {
    const hue = Math.floor(Math.random() * 360)
    document.body.style.backgroundColor = "hsl(" + hue + ", 50%, 5%)"
  }

  // update canvas size
  const updateSize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  // create confetti particles
  const createParticles = () => {
    particles = []
    let total = 100

    if (width > 1080) {
      total = 400
    } else if (width > 760) {
      total = 300
    } else if (width > 520) {
      total = 200
    }

    for (let i = 0; i < total; ++i) {
      particles.push(new ConfettiParticle(context, width, height))
    }
  }

  // animation loop function
  const animationFunc = () => {
    requestAnimationFrame(animationFunc)
    if (Math.random() > 0.98) changeBgColor()
    context.clearRect(0, 0, width, height)

    for (let p of particles) {
      p.width = width
      p.height = height
      p.update()
      p.draw()
    }
  }

  const resizeHandler = () => {
    updateSize()
    createParticles()
  }
  // on resize
  window.addEventListener("resize", resizeHandler)

  // start
  updateSize()
  createParticles()
  changeBgColor()
  animationFunc()

  return {
    cleanup: () => {
      window.removeEventListener("resize", resizeHandler)
    },
  }
}

export const ConfettiComponent = () => {
  startConfetti()
  return <div></div>
}
