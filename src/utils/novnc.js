/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */
import RFB from '@novnc/novnc'
import KeyTable from '@novnc/novnc/core/input/keysym'
import keysyms from '@novnc/novnc/core/input/keysymdef'
import { createAudioElement } from './dom'
import { hasScrollbarGutter } from '@novnc/novnc/core/util/browser.js';
export { isTouchDevice } from '@novnc/novnc/core/util/browser.js';
export { hasScrollbarGutter }

/**
 * A set of all events we want to subscribe to
 * on a RFB instance
 */
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

/**
 * The list of available scaling modes
 */
export const scalingModes = [
  'off',
  'scale',
  'remote'
]

/**
 * A map of key names to keysyms
 */
export const keyMappings = {
  esc: [KeyTable.XK_Escape, 'Escape'],
  tab: [KeyTable.XK_Tab, 'Tab'],
  ctrl: [KeyTable.XK_Control_L, 'ControlLeft'],
  alt: [KeyTable.XK_Alt_L, 'AltLeft'],
  windows: [KeyTable.XK_Super_L, 'MetaLeft'],
  backspace: [KeyTable.XK_BackSpace, 'Backspace'],
  enter: [KeyTable.XK_Return, 'Enter']
}

/**
 * Creates the system bell audio source
 */
export const createBell = name => createAudioElement([
  ['audio/ogg', `${name}.oga`],
  ['audio/mpeg', `${name}.mp3`]
])

/**
 * Creates a new set of settings from old and
 * makes sure that certain properties are mutated
 * based on certain properties
 */
export const detectSettings = (currentSettings, newSettings) => {
  const settings = {
    ...currentSettings,
    ...newSettings
  }

  const scaling = settings.scalingMode === 'scale'
  if (scaling) {
    settings.clipToWindow = false
  } else if (!hasScrollbarGutter) {
    settings.clipToWindow = true
  }

  // Auto detect port if no custom port was defined
  const { port, ssl } = settings
  const newPort = port === 80 && ssl === true
    ? 443
    : (port === 443 && ssl === false ? 80 : undefined)

  if (newPort !== undefined) {
    settings.port = newPort
  }

  return settings
}

/**
 * Extensions to the noVNC RFB Implementation
 */
export class VuenseeRFB extends RFB {

  /**
   * Applies settings directly onto a running instance
   */
  applySettings(settings, {
    dragging = false
  } = {}) {
    this.clipViewport = settings.clipToWindow
    this.scaleViewport = settings.scalingMode === 'scale'
    this.resizeSession = settings.scalingMode === 'remote'
    this.qualityLevel = parseInt(settings.quality, 10) // FIXME: The parseInt can probably go now
    this.compressionLevel = parseInt(settings.compression, 10) // FIXME: The parseInt can probably go now
    this.showDotCursor = settings.dotCursor
    this.viewOnly = settings = settings.viewOnly
    this.dragViewport = !this.clipViewport && this.dragViewport
      ? false
      : dragging
  }

  /**
   * Check if we can use power capabilities
   */
  hasPowerCapabilities() {
    return this.capabilities.power && !this.viewOnly
  }

  /**
   * Sends the given key as a raw input or from the
   * lookup table
   */
  sendKeyCommand(name, value = true) {
    if (keyMappings[name]) {
      const [keysym, code] = keyMappings[name]
      this.sendKey(keysym, code, value)
    } else {
      const keysym = keysyms.lookup(name)
      this.sendKey(keysym)
    }
  }

  /**
   * Wrapper to create a new RFB instance
   */
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
