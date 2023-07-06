import { updateGround, setupGround } from "./ground.js"
import { updateBACKGround, setupBACKGround } from "./background.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 48.5
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const endWinElem = document.querySelector("[data-end-screen-win]")
const endLoseElem = document.querySelector("[data-end-screen-lose]")
const dinoFrame = document.querySelector("[data-dino]")

let  value=4

export function iconValue(increment){
  if (increment==0) {value=4}
  else{value=value+increment}
  

  return value
}



let loopcounterval=-1
export function loopcounter(imm){
  if (imm==0) {loopcounterval=-1
  return loopcounterval}
  else if (imm==-1) {return loopcounterval}
  else {loopcounterval=loopcounterval+1
    return loopcounterval
  }
  
}

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateBACKGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
 
  if (checkLose()||loopcounter(-1)>41) {return handleLose()}


  lastTime = time
  window.requestAnimationFrame(update)
}

export function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}


export function audioPlay(vari){
  const audio = new Audio();
  audio.src=`./finalgame/${vari}.mp3`
  audio.currentTime=0
  audio.play() 
}

var vari1='background'
var vari2='jump'
var vari3='fail'
var vari4='success'
 


let backgroundMusic = document.querySelector("[data-audio]")

function handleStart() {
  backgroundMusic.play()
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupBACKGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
  endLoseElem.classList.add("hide")
  endWinElem.classList.add("hide")
}


function handleLose() {
  setDinoLose()
  if (loopcounter(-1)>=40)
    {endWinElem.classList.remove("hide")
  audioPlay(vari4)
  backgroundMusic.pause()}

  else{ endLoseElem.classList.remove("hide")
  audioPlay(vari3)
  backgroundMusic.pause()}


  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
  }, 100)
  
  iconValue(0)
  loopcounter(0)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
