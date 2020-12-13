/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

export const isSecure = window.location.protocol === 'https:'

export const fullscreen = {
  request: () => (document.documentElement.requestFullscreen ||
    document.documentElement.mozRequestFullscreen ||
    document.documentElement.webkitRequestFullscreen ||
    document.documentElement.msRequestFullscreen).bind(document.documentElement)(),

  exit: () => (document.exitFullscreen ||
    document.mozExitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen).bind(document)(),

  element: () => document.fullscreenElement ||
    document.mozFullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
}

export const getTargetInputValue = ev =>
  ev.target.type === 'checkbox'
    ? ev.target.checked
    : ev.target.value

export const createAudioElement = (sources) => {
  const audio = new Audio()

  sources.forEach(([type, src]) => {
    const el = document.createElement('source')
    el.type = type
    el.src = src
    audio.appendChild(el)
  })

  return audio
}

export const inputKeyListener = (send) => {
  const sendkeys = {
    8: 'backspace',
    9: 'tab',
    13: 'enter'
  }

  let skipInput = false

  return {
    down: (ev) => {
      skipInput = false
      const found = sendkeys[ev.keyCode]

      if (found) {
        skipInput = true
        send(found)
      }
    },

    up: () => {
      skipInput = false
    },

    press: (ev) => {
      if (sendkeys[ev.keyCode]) {
        skipInput = true
      }
    },

    input: (ev) => {
      if (skipInput) {
        return
      }

      const chars = Array.from(ev.target.value)
      chars.forEach(send)
      ev.target.value = ''
    }
  }
}
