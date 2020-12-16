/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

/**
 * If we're on a secure connection
 */
export const isSecure = window.location.protocol === 'https:'

/**
 * A fullscreen toggler and detection wrapper
 */
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

/**
 * A function to get a value from input field
 * with the correct value type
 */
export const getTargetInputValue = (ev) => {
  if (ev.target.type === 'checkbox') {
    return ev.target.checked
  } else if (ev.target.type === 'number' || ev.target.type === 'range') {
    return parseInt(ev.target.value, 10)
  }

  return ev.target.value
}

/**
 * Creates a HTML audio element with a preset
 * of audio sources
 */
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

/**
 * Listen and forward keyboard input
 * from an input field.
 */
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

      // NOTE: Array.from can handle unicore, emojis etc.
      const chars = Array.from(ev.target.value)
      chars.forEach(send)
      ev.target.value = ''
    }
  }
}
