/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

export const requestFullscreen = () => (document.documentElement.requestFullscreen ||
  document.documentElement.mozRequestFullscreen ||
  document.documentElement.webkitRequestFullscreen ||
  document.documentElement.msRequestFullscreen).bind(document.documentElement)()

export const exitFullscreen = () => (document.exitFullscreen ||
  document.mozExitFullscreen ||
  document.webkitExitFullscreen ||
  document.msExitFullscreen).bind(document)()

export const getFullscreenElement = () => document.fullscreenElement ||
  document.mozFullscreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement

export const getTargetInputValue = ev =>
  ev.target.type === 'checkbox'
    ? ev.target.checked
    : ev.target.value

export const playBell = (() => {
  const createSource = (type, src) => {
    const el = document.createElement('source')
    el.type = type
    el.src = src
    return el
  }

  const audio = new Audio()
  audio.appendChild(createSource('audio/ogg', 'sounds/bell.oga'))
  audio.appendChild(createSource('audio/mpeg', 'sounds/bell.mpeg'))

  return () => audio.play()
})()
