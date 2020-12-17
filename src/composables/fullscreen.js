/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { onBeforeMount, onBeforeUnmount } from 'vue'
import { fullscreen } from '../utils/dom'

export const useFullscreen = (onchange) => {
  const exitFullscreen = () => fullscreen.exit()
  const requestFullscreen = () => fullscreen.request()
  const onFullscreenChange = () => onchange(!!fullscreen.element())

  onBeforeMount(() => window.addEventListener('fullscreenchange', onFullscreenChange))
  onBeforeUnmount(() => window.removeEventListener('fullscreenchange', onFullscreenChange))

  return {
    exitFullscreen,
    requestFullscreen
  }
}
