/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { ref, onBeforeUnmount } from 'vue'
import { VuenseeRFB, createBell } from '../utils/novnc'

/**
 * Composable to create and display a VNC connection
 */
export const useRFB = ({
  root,
  bellSound
}) => {
  const bell = createBell(bellSound)
  const rfb = ref({})
  const reconnectTimeout = ref(null)

  onBeforeUnmount(() => {
    try {
      if (rfb.value.disconnect) {
        rfb.value.disconnect()
      }
    } catch (e) {
      console.warn(e)
    }

    clearTimeout(reconnectTimeout.value)
  })

  const connect = (options, bindings) => {
    rfb.value = VuenseeRFB.connect({
      root: root.value,
      options,
      bindings
    })
  }

  const reconnect = (delay, cb) => {
    reconnectTimeout.value = setTimeout(cb, delay)
  }

  const disconnect = () => {
    clearTimeout(reconnectTimeout.value)
    rfb.value.disconnect()
  }

  return {
    rfb,
    bell,
    connect,
    reconnect,
    disconnect
  }
}
