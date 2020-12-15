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
  showLogin: false,
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

  // Overrides
  showSettings: config.features.settings
})

const toggleable = (k, pre = {}) => (v = !store[k]) =>
  Object.assign(store, {
    ...pre,
    [k]: v
  })

const assignConnection = assign => Object.assign(store, {
  ...defaultConnectionStates,
  ...defaultVisibility,
  ...assign
})

export const assignSettings = settings =>
  Object.assign(store.settings, detectSettings(store.settings, settings))

export const assignCapabilities = capabilities =>
  Object.assign(store.capabilities, capabilities)

export const toggleKey = key => (store.keys[key] = !store.keys[key])

export const toggleFullscreen = toggleable('fullscreen')

export const togglePanelOpen = toggleable('panelOpen')

export const toggleDragging = toggleable('dragging')

export const toggleLogin = toggleable('showLogin')

export const toggleSettings = toggleable('showSettings', defaultVisibility)

export const togglePower = toggleable('showPower', defaultVisibility)

export const toggleKeys = toggleable('showKeys', defaultVisibility)

export const toggleClipboard = toggleable('showClipboard', defaultVisibility)

export const toggleTouchKeyboard = toggleable('touchKeyboard')

export const clearClipboard = () => (store.clipboard = '')

export const updateClipboard = clipboard => (store.clipboard = clipboard)

export const connectionActivate = () => assignConnection({
  connecting: true
})

export const connectionDeactivate = () => assignConnection({
  showSettings: true,
  disconnecting: true
})

export const connectionActivated = () => assignConnection({
  connected: true,
  panelOpen: false
})

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

export const removeMessage = (key) => {
  const foundIndex = store.messages.findIndex(message => message.key === key)
  if (foundIndex !== -1) {
    store.messages.splice(foundIndex, 1)
  }
}

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

export const state = readonly(store)
