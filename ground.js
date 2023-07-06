import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.02
const groundElems = document.querySelectorAll("[data-ground]")


export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", 150)
  setCustomProperty(groundElems[2], "--left", 0)
  setCustomProperty(groundElems[3], "--left", 150)
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(ground, "--left") <= -150) {
      incrementCustomProperty(ground, "--left", 300)
    }
  })
}



