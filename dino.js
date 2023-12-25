import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

import { audioPlay } from "./script.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.002
const DINO_FRAME_COUNT = 3
const FRAME_TIME = 100
dinoElem  .classList.add("hide")

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 12)
  document.removeEventListener("keydown", onJump)
  dinoElem  .classList.remove("hide")
  var vari2='jump'
  audioPlay(vari2) 
  document.addEventListener("keydown", onJump)
  
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = `assets/exportedGraphics/characterf2.png`
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `assets/exportedGraphics/characterf1.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `assets/exportedGraphics/characterf${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 12) {
    setCustomProperty(dinoElem, "--bottom", 12)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return
  var vari2='jump'
  audioPlay(vari2) 
  yVelocity = JUMP_SPEED
  isJumping = true
}
