import React, { useEffect, useState } from "react"
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
    // this.darken()
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
  const id = "particle-canvas"
  canvas.id = id
  canvas.width = width
  canvas.height = height
  canvas.setAttribute(
    "style",
    "position:fixed;z-index: -1; top: 0; bottom: 0; left: 0; right: 0; pointer-events: none;"
  )
  document.body.appendChild(canvas)

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
    let total = 25

    if (width > 1080) {
      total = 150
    } else if (width > 760) {
      total = 100
    } else if (width > 520) {
      total = 50
    }

    for (let i = 0; i < total; ++i) {
      particles.push(new ConfettiParticle(context, width, height))
    }
  }
  let animationFn
  // animation loop function
  const animationFunc = () => {
    animationFn = requestAnimationFrame(animationFunc)
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
  animationFunc()

  return () => {
    window.removeEventListener("resize", resizeHandler)
    if (animationFn && cancelAnimationFrame) {
      window.cancelAnimationFrame(animationFn)
    }
    context.clearRect(0, 0, width, height)
    const canvasToRemove = document.getElementById(id)
    if (canvasToRemove) canvasToRemove.remove()
  }
}

export const ConfettiComponent = ({ editorMode }) => {
  const [showConfetti, setShowConfetti] = useState(true)
  useEffect(() => {
    if (showConfetti) {
      const cleanup = startConfetti()
      return () => {
        if (cleanup) {
          cleanup()
        }
      }
    }
  }, [showConfetti])
  if (editorMode) {
    return (
      <div>
        Forhåndsvisning av konfettiregn. Kun du ser denne visningen.
        <br />
        <label style={{ display: "inline-block" }}>
          <input
            id="prevoewconfetti"
            style={{ margin: "0 12px 0 0", top: "3px" }}
            checked={showConfetti}
            type="checkbox"
            className="input-toggle"
            onChange={() => setShowConfetti(!showConfetti)}
          />
          {showConfetti ? "Skjul " : "Vis "} konfetti
        </label>
      </div>
    )
  }
  return null
}
