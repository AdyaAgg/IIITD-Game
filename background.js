import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEEDback = 0.015
  const backgroundElems = document.querySelectorAll("[data-background]")


  export function setupBACKGround() {
    setCustomProperty(backgroundElems[0], "--left", 0)
    setCustomProperty(backgroundElems[1], "--left", 10000)
  }
  
  export function updateBACKGround(delta, speedScale) {
    backgroundElems.forEach(background => {
      incrementCustomProperty(background, "--left", delta * speedScale * SPEEDback * -1)
  
      if (getCustomProperty(background, "--left") <= -10000) {
        incrementCustomProperty(background, "--left", 20000)
      }
    })
  }