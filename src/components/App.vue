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
        :view-only="settings.viewOnly"
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

    <Logo />

    <div
      ref="view"
      :class="$style.vnc"
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

.vnc {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
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
import Logo from './Logo.vue'

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
    Logo
  },

  setup() {
    const { t } = useI18n()
    const panel = ref(null)
    const view = ref(null)

    const onFullscreenChange = () => store.updateFullscreen(
      !!getFullscreenElement()
    )

    onBeforeMount(() => (document.title = config.title))
    onBeforeMount(() => window.addEventListener('fullscreenchange', onFullscreenChange))
    onBeforeUnmount(() => window.removeEventListener('fullscreenchange', onFullscreenChange))

    return {
      features: config.features,
      panel,
      view,
      t
    }
  },

  data() {
    return store.state
  },

  mounted() {
    if (this.settings.autoconnect) {
      this.onConnectRequest()
    }
  },

  methods: {
    onSettingsToggle() {
      store.toggleSettings()
    },

    onUpdateSettings({ key, value }) {
      store.updateSettings({
        [key]: value
      })

      if (this.connected) {
        client.applySettings(this.settings)
      }
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

      client.connect({
        root: this.view,
        options: this.settings,
        bindings: {
          disconnect: this.onDisconnected,
          connect: this.onConnected,
          credentialsrequired: this.onCredentialsRequired,
          securityfailure: this.onSecurityFailure,
          desktopname: this.onDesktopName,
          bell: this.onBell,
          capabilities: this.onCapabilities,
          clipboard: this.onClipboard
        }
      })
    },

    onDisconnectRequest() {
      clearTimeout(_reconnectTimeout)
      store.connectionDeactivate()
      client.disconnect()
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
