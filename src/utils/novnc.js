/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import RFB from '@novnc/novnc'
import KeyTable from '@novnc/novnc/core/input/keysym'
import { createAudioElement } from './dom'

export { hasScrollbarGutter } from '@novnc/novnc/core/util/browser.js';

const events = [
  'disconnect',
  'connect',
  'credentialsrequired',
  'securityfailure',
  'desktopname',
  'bell',
  'capabilities',
  'clipboard'
]

export const scalingModes = [
  'off',
  'scale',
  'remote'
]

export const keyMappings = {
  esc: [KeyTable.XK_Escape, 'Escape'],
  tab: [KeyTable.XK_Tab, 'Tab'],
  ctrl: [KeyTable.XK_Control_L, 'ControlLeft'],
  alt: [KeyTable.XK_Alt_L, 'AltLeft'],
  windows: [KeyTable.XK_Super_L, 'MetaLeft']
}

export const createBell = name => createAudioElement([
  ['audio/ogg', `${name}.oga`],
  ['audio/mpeg', `${name}.mp3`]
])

export class VuenseeRFB extends RFB {
  applySettings(settings) {
    this.clipViewport = settings.clipToWindow
    this.scaleViewport = settings.scalingMode === 'scale'
    this.resizeSession = settings.scalingMode === 'remote'
    this.qualityLevel = settings.quality
    this.compressionLevel = settings.compression
    this.showDotCursor = settings.dotCursor
    this.viewOnly = settings = settings.viewOnly
  }

  hasPowerCapabilities() {
    return this.capabilities.power && !this.viewOnly
  }

  sendKeyCommand(name, value = true) {
    const [keysym, code] = keyMappings[name]
    this.sendKey(keysym, code, value)
  }

  static connect({
    root,
    bindings,
    options: {
      username,
      password,
      hostname,
      path,
      port,
      ssl,
      ...settings
    }
  }) {
    const url = `ws${ssl ? 's' : ''}://${hostname}:${port}/${path}`

    const wrapper = name => e => {
      if (import.meta.env.DEV) {
        console.debug(name, e)
      }

      return bindings[name](e)
    }

    const rfb = new VuenseeRFB(root, url, {
      shared: settings.sharedMode,
      repeaterID: settings.repeaterId,

      // NOTE: It's important to set to undefined, or else it will
      // try to send the value as credentials, making connection fail!
      // We want a login prompt in this case.
      credentials: {
        username: username || undefined,
        password: password || undefined
      }
    })

    // NOTE: Manually unsubscribe from all events when we disconnect.
    // This is because we create a new instance whenever a connection goes down.
    // We might find a way to get around that in the future.
    const listeners = events.map(name => [name, wrapper(name)])
    listeners.forEach(([name, cb]) => rfb.addEventListener(name, cb))

    rfb.addEventListener('disconnect', () => {
      listeners.forEach(([name, cb]) => rfb.removeEventListener(name, cb))
    })

    rfb.applySettings(settings)

    return rfb
  }
}
