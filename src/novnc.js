/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import RFB from '@novnc/novnc'
import KeyTable from '@novnc/novnc/core/input/keysym'

export const keyMappings = {
  esc: [KeyTable.XK_Escape, 'Escape'],
  tab: [KeyTable.XK_Tab, 'Tab'],
  ctrl: [KeyTable.XK_Control_L, 'ControlLeft'],
  alt: [KeyTable.XK_Alt_L, 'AltLeft'],
  windows: [KeyTable.XK_Super_L, 'MetaLeft']
}

export const client = {
  rfb: null,

  applySettings(settings) {
    this.rfb.clipViewport = settings.clipToWindow
    this.rfb.scaleViewport = settings.scalingMode === 'scale'
    this.rfb.resizeSession = settings.scalingMode === 'remote'
    this.rfb.qualityLevel = settings.quality
    this.rfb.compressionLevel = settings.compression
    this.rfb.showDotCursor = settings.dotCursor
    this.rfb.viewOnly = settings = settings.viewOnly
  },

  hasPowerCapabilities() {
    return this.rfb.capabilities.power && !this.rfb.viewOnly
  },

  clearClipboard() {
    this.rfb.clipboardPasteFrom('')
  },

  sendClipboardData(text) {
    this.rfb.clipboardPasteFrom(text)
  },

  sendPowerSignal(signal) {
    if (signal === 'shutdown') {
      this.rfb.machineShutdown()
    } else if (signal === 'reboot') {
      this.rfb.machineReboot()
    } else if (signal === 'reset') {
      this.rfb.machineReset()
    }
  },

  sentCtrlAltDelete() {
    this.rfb.sendCtrlAltDel()
    this.rfb.focus()
  },

  sendKey(name, value = true) {
    if (this.rfb) {
      const [keysym, code] = keyMappings[name]

      this.rfb.sendKey(keysym, code, value)
      this.rfb.focus()
    }
  },

  sendCredentials(creds) {
    this.rfb.sendCredentials(creds)
  },

  focus() {
    if (this.rfb) {
      this.rfb.focus()
    }
  },

  disconnect() {
    if (this.rfb) {
      try {
        this.rfb.disconnect()
      } catch (e) {
        console.warn(e)
      }
    }
  },

  connect({
    root,
    emitter,
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

    this.rfb = new RFB(root, url, {
      shared: settings.sharedMode,
      repeaterID: settings.repeaterId,
      credentials: {
        username: username || undefined,
        password: password || undefined
      }
    })

    this.rfb.addEventListener('disconnect', e => emitter('disconnected', e))
    this.rfb.addEventListener('connect', e => emitter('connected', e))
    this.rfb.addEventListener('credentialsrequired', e => emitter('credentialsrequired', e))
    this.rfb.addEventListener('securityfailure', e => emitter('securityfailure', e))
    this.rfb.addEventListener('desktopname', e => emitter('desktopname', e))
    this.rfb.addEventListener('bell', e => emitter('bell', e))
    this.rfb.addEventListener('capabilities', e => emitter('capabilities', e))
    this.rfb.addEventListener('clipboard', e => emitter('clipboard', e))

    this.applySettings(settings)

    return this.rfb
  }
}
