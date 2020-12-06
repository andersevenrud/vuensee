/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */
import { reactive, readonly } from 'vue'
import config from './config'

const _ssl = window.location.protocol === 'https:'

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

const initialCapabilities = {
  power: false
}

const _state = reactive({
  ...defaultVisibility,
  showSettings: config.features.settings,
  messages: [],
  fullscreen: false,
  connected: false,
  connecting: false,
  disconnecting: false,
  reconnecting: false,
  clipboard: '',

  capabilities: {
    ...initialCapabilities
  },

  keys: {
    ...initialKeys
  },

  settings: {
    autoconnect: false,
    username: '',
    password: '',
    bell: true,
    sharedMode: true,
    viewOnly: false,
    clipToWindow: false,
    scalingMode: 'off',
    quality: 6,
    compression: 2,
    reconnect: false,
    reconnectDelay: 5000,
    dotCursor: false,
    hostname: window.location.hostname,
    path: 'websockify',
    repeaterId: '',
    port: _ssl ? 443 : 80,
    ssl: _ssl,

    ...config.defaultSettings
  }
})

export const state = readonly(_state)

export const toggleKey = key => (_state.keys[key] = !_state.keys[key])

export const updateSettings = (settings) => {
  Object.assign(_state.settings, settings)

  const { port, ssl } = _state.settings

  // Auto detect port if no custom port was defined
  const newPort = port === 80 && ssl === true
    ? 443
    : (port === 443 && ssl === false ? 80 : undefined)

  if (newPort !== undefined) {
    _state.settings.port = newPort
  }
}

export const addMessage = (message, type = 'info') => {
  _state.messages.unshift({
    key: _messageKey++,
    message,
    type
  })

  setTimeout(() => _state.messages.pop(), 3000)
}

export const updateFullscreen = fullscreen => (_state.fullscreen = fullscreen)

export const updateCapabilities = capabilities => Object.assign(_state.capabilities, capabilities)

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

export const clearClipboard = () => (_state.clipboard = '')

export const updateClipboard = (clipboard) => (_state.clipboard = clipboard)

export const connectionActivate = () => Object.assign(_state, {
  showSettings: false,
  showLogin: false,
  reconnecting: false,
  disconnecting: false,
  connecting: true,
  connected: false
})

export const connectionDeactivate = () => Object.assign(_state, {
  showLogin: false,
  showSettings: true,
  reconnecting: false,
  disconnecting: true,
  connecting: false,
  connected: false
})

export const connectionActivated = () => Object.assign(_state, {
  reconnecting: false,
  showLogin: false,
  showSettings: false,
  disconnecting: false,
  connecting: false,
  connected: true
})

export const connectionDeactivated = (reconnecting = false) => Object.assign(_state, {
  reconnecting,
  clipboard: '',
  showLogin: false,
  showSettings: !reconnecting,
  disconnecting: false,
  connecting: false,
  connected: false,
  capabilities: {
    ...initialCapabilities
  },
  keys: {
    ...initialKeys
  }
})
