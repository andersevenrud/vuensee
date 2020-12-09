/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import RFB from '@novnc/novnc'
import KeyTable from '@novnc/novnc/core/input/keysym'
import { createAudioElement } from './dom'

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

export const bell = createAudioElement([
  ['audio/ogg', 'sounds/bell.oga'],
  ['audio/mpeg', 'sounds/bell.mp3']
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

    const rfb = new VuenseeRFB(root, url, {
      shared: settings.sharedMode,
      repeaterID: settings.repeaterId,

      // NOTE: It's important to set to undefined, or else it will be
      // try to send the value as credentials, making connection fail!
      // We want a login prompt in this case.
      credentials: {
        username: username || undefined,
        password: password || undefined
      }
    })

    rfb.addEventListener('disconnect', e => bindings.disconnect(e))
    rfb.addEventListener('connect', e => bindings.connect(e))
    rfb.addEventListener('credentialsrequired', e => bindings.credentialsrequired(e))
    rfb.addEventListener('securityfailure', e => bindings.securityfailure(e))
    rfb.addEventListener('desktopname', e => bindings.desktopname(e))
    rfb.addEventListener('bell', e => bindings.bell(e))
    rfb.addEventListener('capabilities', e => bindings.capabilities(e))
    rfb.addEventListener('clipboard', e => bindings.clipboard(e))
    rfb.applySettings(settings)

    return rfb
  }
}
