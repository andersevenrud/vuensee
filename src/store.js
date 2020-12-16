/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */
import { reactive, readonly } from 'vue'
import { isSecure } from './utils/dom'
import { detectSettings, hasScrollbarGutter } from './utils/novnc'
import config from './config'

let _messageKey = 0

const defaultVisibility = {
  showSettings: false,
  showPower: false,
  showKeys: false,
  showClipboard: false
}

const defaultConnectionStates = {
  connected: false,
  connecting: false,
  disconnecting: false,
  reconnecting: false,
}

const initialKeys = {
  ctrl: false,
  alt: false,
  windows: false
}

const initialCapabilities = {
  power: false
}

const initialSettings = {
  language: 'en',
  autoconnect: false,
  username: '',
  password: '',
  bell: true,
  sharedMode: true,
  viewOnly: false,
  clipToWindow: !hasScrollbarGutter,
  scalingMode: 'off',
  quality: 6,
  compression: 2,
  reconnect: false,
  reconnectDelay: 5000,
  messageTimeout: 3000,
  dotCursor: false,
  hostname: window.location.hostname,
  path: 'websockify',
  repeaterId: '',
  port: isSecure ? 443 : 80,
  ssl: isSecure
}

const store = reactive({
  messages: [],
  dragging: false,
  touchKeyboard: false,
  fullscreen: false,
  panelOpen: true,
  loginOpen: false,
  clipboard: '',

  ...defaultConnectionStates,
  ...defaultVisibility,

  capabilities: {
    ...initialCapabilities
  },

  keys: {
    ...initialKeys
  },

  settings: {
    ...initialSettings,
    ...config.settings
  },

  showSettings: config.features.settings
})

/**
 * Composition to set a store property by value or the opposite
 * of the current value
 */
const toggleable = (k, pre = {}) => (v = !store[k]) =>
  Object.assign(store, {
    ...pre,
    [k]: v
  })

/**
 * Resets states related to connectivity before assigning new ones
 */
const assignConnection = assign => Object.assign(store, {
  loginOpen: false,
  ...defaultConnectionStates,
  ...defaultVisibility,
  ...assign
})

/**
 * Updates settings with the new values and makes any adjustments
 * required to fulfill certain rules
 */
export const assignSettings = settings =>
  Object.assign(store.settings, detectSettings(store.settings, settings))

/**
 * Updates the available capabilities of the remove machine
 */
export const assignCapabilities = capabilities =>
  Object.assign(store.capabilities, capabilities)

/**
 * Toggles the active state of a (keyboard) key in the panel
 */
export const toggleKey = key => (store.keys[key] = !store.keys[key])

/**
 * Toggles fullscreen state
 */
export const toggleFullscreen = toggleable('fullscreen')

/**
 * Toggle if sidebar panel is open
 */
export const togglePanelOpen = toggleable('panelOpen')

/**
 * Toggles viewport dragging functionalify
 */
export const toggleDragging = toggleable('dragging')

/**
 * Toggles visibility of login modal
 */
export const toggleLogin = toggleable('loginOpen')

/**
 * Toggles settings visibility in panel
 */
export const toggleSettings = toggleable('showSettings', defaultVisibility)

/**
 * Toggles power button capabilities visibility in panel
 */
export const togglePower = toggleable('showPower', defaultVisibility)

/**
 * Toggles (keyboard) keys visibility in panel
 */
export const toggleKeys = toggleable('showKeys', defaultVisibility)

/**
 * Toggles clopboard interaction visibility in panel
 */
export const toggleClipboard = toggleable('showClipboard', defaultVisibility)

/**
 * Toggles the state for activating touch device on-screen keyboard
 */
export const toggleTouchKeyboard = toggleable('touchKeyboard')

/**
 * Updates the stored cliboard value
 */
export const updateClipboard = clipboard => (store.clipboard = clipboard)

/**
 * Connection was requested
 */
export const connectionActivate = (reconnecting = false) => assignConnection({
  connecting: true,
  reconnecting
})

/**
 * Disconnect was requested
 */
export const connectionDeactivate = () => assignConnection({
  showSettings: true,
  disconnecting: true
})

/**
 * Connection was successful
 */
export const connectionActivated = () => assignConnection({
  connected: true,
  panelOpen: false
})

/**
 * Disconnected
 */
export const connectionDeactivated = (reconnecting = false) =>
  assignConnection({
    reconnecting,
    clipboard: '',
    touchKeyboard: false,
    dragging: false,
    panelOpen: !reconnecting,
    settings: {
      ...store.settings,
      password: reconnecting ? store.password : ''
    },
    capabilities: {
      ...initialCapabilities
    },
    keys: {
      ...initialKeys
    }
  })

/**
 * Removes given message
 */
export const removeMessage = (key) => {
  const foundIndex = store.messages.findIndex(message => message.key === key)
  if (foundIndex !== -1) {
    store.messages.splice(foundIndex, 1)
  }
}

/**
 * Adds a message with given type
 */
export const addMessage = (message, type = 'info') => {
  const entry = {
    key: _messageKey++,
    message,
    type
  }

  if (store.settings.messageTimeout > 0) {
    setTimeout(() => removeMessage(entry.key), store.settings.messageTimeout)
  }

  store.messages.unshift(entry)
}

/**
 * Store for use in componenets
 */
export const state = readonly(store)
