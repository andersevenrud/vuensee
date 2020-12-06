<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.app">
    <Panel
      :visible="showSettings"
      @mouseout="onMouseOut"
    >
      <Controls
        :connected="connected"
        :connecting="connecting"
        :reconnecting="reconnecting"
        :fullscreen="fullscreen"
        :power="capabilities.power"
        @settings="onSettingsToggle"
        @connect="onConnectRequest"
        @disconnect="onDisconnectRequest"
        @maximize="onMaximize"
        @minimize="onMinimize"
        @power="onPower"
        @toggle-keys="onToggleKeys"
        @toggle-clipboard="onToggleClipboard"
      />

      <Power
        v-show="showPower"
        @shutdown="onPowerShutdown"
        @reboot="onPowerReboot"
        @reset="onPowerReset"
      />

      <Keys
        v-show="showKeys"
        :active="keys"
        @toggle="onKeyToggle"
        @send="onKeySend"
      />

      <Clipboard
        v-show="showClipboard"
        :current="clipboard"
        @clear="onClipboardClear"
      />

      <Settings
        v-if="features.settings"
        v-show="showSettings"
        :disabled="connected || connecting"
        :settings="settings"
        @update="onUpdateSettings"
      />
    </Panel>

    <NoVNC
      :connected="connected"
      :connecting="connecting"
      :disconnecting="disconnecting"
      :options="settings"
      @disconnected="onDisconnected"
      @connected="onConnected"
      @credentialsrequired="onCredentialsRequired"
      @securityfailure="onSecurityFailure"
      @desktopname="onDesktopName"
      @bell="onBell"
      @capabilities="onCapabilities"
      @clipboard="onClipboard"
      @error="onError"
    />

    <Login
      v-if="showLogin"
      @submit="onSubmitCredentials"
    />

    <Messages
      :messages="messages"
    />
  </div>
</template>

<style module>
.app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>

<script>
import {
  ref,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'
import { useI18n } from 'vue-i18n'
import {
  requestFullscreen,
  exitFullscreen,
  getFullscreenElement,
  playBell
} from '../utils'
import { client } from '../novnc'
import * as store from '../store'
import config from '../config'
import Panel from './Panel.vue'
import Controls from './Controls.vue'
import Power from './Power.vue'
import Keys from './Keys.vue'
import Clipboard from './Clipboard.vue'
import Settings from './Settings.vue'
import Login from './Login.vue'
import Messages from './Messages.vue'
import NoVNC from './NoVNC.vue'

let _reconnectTimeout

export default {
  name: 'App',

  components: {
    Panel,
    Controls,
    Power,
    Keys,
    Clipboard,
    Settings,
    Login,
    Messages,
    NoVNC
  },

  setup() {
    const { t } = useI18n()
    const panel = ref(null)

    const onFullscreenChange = () => store.updateFullscreen(
      !!getFullscreenElement()
    )

    onBeforeMount(() => (document.title = config.title))
    onBeforeMount(() => window.addEventListener('fullscreenchange', onFullscreenChange))
    onBeforeUnmount(() => window.removeEventListener('fullscreenchange', onFullscreenChange))

    return {
      features: config.features,
      panel,
      t
    }
  },

  data() {
    return store.state
  },

  methods: {
    onSettingsToggle() {
      store.toggleSettings()
    },

    onUpdateSettings({ key, value }) {
      store.updateSettings({
        [key]: value
      })
    },

    onError(message) {
      store.addMessage(message, 'error')
    },

    onBell() {
      if (this.settings.bell) {
        playBell()
      }
    },

    onSecurityFailure(ev) {
      this.onError(this.t('messages.securityFailure', ev.detail))
    },

    onDesktopName(ev) {
      document.title = `${ev.detail.name} - ${config.title}`
    },

    onCapabilities() {
      store.updateCapabilities({
        power: client.hasPowerCapabilities()
      })
    },

    onClipboard(e) {
      store.updateClipboard(e.detail.text)
    },

    onClipboardClear() {
      client.clearClipboard()
      store.clearClipboard()
    },

    onClipboardUpdate(text) {
      client.sendClipboardData(text)
      store.updateClipboard(text)
    },

    onCredentialsRequired() {
      store.toggleLogin(true)
    },

    onConnected() {
      store.connectionActivated()
      client.focus()
    },

    onDisconnected(e) {
      document.title = config.title

      if (e.detail.clean) {
        store.addMessage(this.t('messages.disconnected'))

        if (this.settings.reconnect) {
          const delay = this.settings.reconnectDelay
          store.addMessage(this.t('messages.reconnecting', { delay }))

          _reconnectTimeout = setTimeout(() => {
            this.onnConnectRequest()
          }, delay)
        }
      } else {
        if (store.state.connected) {
          store.addMessage(this.t('messages.connectionLost'), 'error')
        } else {
          store.addMessage(this.t('messages.connectionFailure'), 'error')
        }
      }

      store.connectionDeactivated(this.settings.reconnect)
    },

    onConnectRequest() {
      store.addMessage(this.t('messages.connecting'))
      store.connectionActivate()
    },

    onDisconnectRequest() {
      clearTimeout(_reconnectTimeout)

      store.connectionDeactivate()
    },

    onMaximize() {
      requestFullscreen()
    },

    onMinimize() {
      exitFullscreen()
    },

    onPower() {
      store.togglePower()
    },

    onToggleKeys() {
      store.toggleKeys()
    },

    onToggleClipboard() {
      store.toggleClipboard()
    },

    onPowerShutdown() {
      client.sendPowerSignal('shutdown')
    },

    onPowerReboot() {
      client.sendPowerSignal('reboot')
    },

    onPowerReset() {
      client.sendPowerSignal('reset')
    },

    onKeyToggle(key) {
      const toggle = store.toggleKey(key)
      client.sendKey(key, toggle)
    },

    onKeySend(key) {
      client.sendKey(key)
    },

    onMouseOut() {
      if (this.connected) {
        client.focus()
      }
    },

    onSubmitCredentials(creds) {
      store.updateSettings(creds)
      client.sendCredentials(creds)
    }
  }
}
</script>