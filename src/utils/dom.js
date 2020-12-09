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
