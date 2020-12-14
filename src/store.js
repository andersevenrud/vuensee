/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import { reactive, readonly } from 'vue'
import { isSecure } from './utils/dom'
import { hasScrollbarGutter } from './utils/novnc'
import config from './config'

let _messageKey = 0

const initialKeys = {
  ctrl: false,
  alt: false,
  windows: false
}

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

const _state = reactive({
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

export const state = readonly(_state)

export const toggleKey = key => (_state.keys[key] = !_state.keys[key])

export const updateSettings = (settings) => {
  const newSettings = {
    ..._state.settings,
    ...settings
  }

  const scaling = newSettings.scalingMode === 'scale'
  if (scaling) {
    newSettings.clipToWindow = false
  } else if (!hasScrollbarGutter) {
    newSettings.clipToWindow = true
  }

  // Auto detect port if no custom port was defined
  const { port, ssl } = _state.settings
  const newPort = port === 80 && ssl === true
    ? 443
    : (port === 443 && ssl === false ? 80 : undefined)

  if (newPort !== undefined) {
    newSettings.port = newPort
  }

  return Object.assign(_state.settings, newSettings)
}

export const removeMessage = (key) => {
  const foundIndex = _state.messages.findIndex(message => message.key === key)
  if (foundIndex !== -1) {
    _state.messages.splice(foundIndex, 1)
  }
}

export const addMessage = (message, type = 'info') => {
  const key =  _messageKey++

  _state.messages.unshift({
    key,
    message,
    type
  })

  if (_state.settings.messageTimeout > 0) {
    setTimeout(() => removeMessage(key), _state.settings.messageTimeout)
  }
}

export const updateFullscreen = fullscreen => (_state.fullscreen = fullscreen)

export const updateCapabilities = capabilities => Object.assign(_state.capabilities, capabilities)

export const togglePanelOpen = (panelOpen = !_state.panelOpen) => (_state.panelOpen = panelOpen)

export const toggleDragging = (dragging = !_state.dragging) => (_state.dragging = dragging)

export const toggleLogin = (showLogin = !_state.showLogin) => (_state.showLogin = showLogin)

export const toggleSettings = (showSettings = !_state.showSettings) => Object.assign(_state, {
  ...defaultVisibility,
  showSettings
})

export const togglePower = (showPower = !_state.showPower) => Object.assign(_state, {
  ...defaultVisibility,
  showPower
})

export const toggleKeys = (showKeys = !_state.showKeys) => Object.assign(_state, {
  ...defaultVisibility,
  showKeys
})

export const toggleClipboard = (showClipboard = !_state.showClipboard) => Object.assign(_state, {
  ...defaultVisibility,
  showClipboard
})

export const toggleTouchKeyboard = (touchKeyboard = !_state.touchKeyboard) => Object.assign(_state, {
  touchKeyboard
})

export const clearClipboard = () => (_state.clipboard = '')

export const updateClipboard = (clipboard) => (_state.clipboard = clipboard)

export const connectionActivate = () => Object.assign(_state, {
  ...defaultConnectionStates,
  ...defaultVisibility,
  connecting: true
})

export const connectionDeactivate = () => Object.assign(_state, {
  ...defaultConnectionStates,
  ...defaultVisibility,
  showSettings: true,
  disconnecting: true
})

export const connectionActivated = () => Object.assign(_state, {
  ...defaultConnectionStates,
  ...defaultVisibility,
  connected: true,
  panelOpen: false
})

export const connectionDeactivated = (reconnecting = false) => Object.assign(_state, {
  ...defaultConnectionStates,
  ...defaultVisibility,
  reconnecting,
  clipboard: '',
  touchKeyboard: false,
  panelOpen: !reconnecting,
  dragging: false,
  settings: {
    ..._state.settings,
    password: reconnecting ? _state.password : ''
  },
  capabilities: {
    ...initialCapabilities
  },
  keys: {
    ...initialKeys
  }
})
