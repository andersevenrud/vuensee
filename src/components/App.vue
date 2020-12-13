<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.app">
    <Panel
      v-if="config.features.panel"
      :visible="panelOpen"
      @mouseout="onMouseOut"
    >
      <Controls
        :connected="connected"
        :connecting="connecting"
        :reconnecting="reconnecting"
        :fullscreen="fullscreen"
        :power="capabilities.power"
        :view-only="settings.viewOnly"
        :clip-to-window="settings.clipToWindow"
        :features="config.features"
        :dragging="dragging"
        :touch-keyboard="touchKeyboard"
        @settings="onSettingsToggle"
        @drag="onDragToggle"
        @connect="onConnectRequest"
        @disconnect="onDisconnectRequest"
        @maximize="onMaximize"
        @minimize="onMinimize"
        @power="onPower"
        @toggle-keys="onToggleKeys"
        @toggle-clipboard="onToggleClipboard"
        @toggle-touch-keyboard="onToggleTouchKeyboard"
      >
        <div :class="{ [$style.toggler]: true, [$style.togglerOpen]: panelOpen }">
          <Button @click="onTogglePanel">
            <ChevronIcon :dir="panelOpen ? 'left' : 'right'" />
          </Button>
        </div>
      </Controls>

      <template v-if="panelOpen">
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
          v-if="config.features.settings"
          v-show="showSettings"
          :disabled="connected || connecting"
          :settings="settings"
          @update="onUpdateSettings"
        />
      </template>
    </Panel>

    <Logo
      :title="config.title"
    />

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
      @click="onMessageClick"
    />

    <TouchKeyboard
      v-if="config.features.touchKeyboard && touchKeyboard"
      @focus="onTouchKeyboardFocus"
      @blur="onTouchKeyboardBlur"
      @hide="onTouchKeyboardHide"
      @input="onTouchKeyboardInput"
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
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.toggler {
  margin-left: auto;
}

.toggler button {
  background-color: var(--vuensee-background-color);
  padding: var(--vuensee-margin-half) 0;
}

.togglerOpen button {
  margin-left: var(--vuensee-margin-half);
}
</style>

<script>
import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fullscreen } from '../utils/dom'
import { VuenseeRFB, createBell } from '../utils/novnc'
import * as store from '../store'
import config from '../config'
import Panel from './layout/Panel.vue'
import Controls from './layout/Controls.vue'
import Power from './layout/Power.vue'
import Keys from './layout/Keys.vue'
import Clipboard from './layout/Clipboard.vue'
import Settings from './layout/Settings.vue'
import Login from './layout/Login.vue'
import Messages from './layout/Messages.vue'
import Logo from './layout/Logo.vue'
import TouchKeyboard from './layout/TouchKeyboard.vue'

let _client = {}
let _reconnectTimeout // TODO: Implement proper reconnect mechanic

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
    Logo,
    TouchKeyboard
  },

  setup() {
    const { t, locale } = useI18n()
    const bell = createBell(config.bell)
    const textarea = ref(null)
    const onFullscreenChange = () => store.updateFullscreen(!!fullscreen.element())

    watch(() => store.state.settings.language, (newLocale) => {
      locale.value = newLocale
    })

    onBeforeMount(() => window.addEventListener('fullscreenchange', onFullscreenChange))
    onBeforeUnmount(() => window.removeEventListener('fullscreenchange', onFullscreenChange))

    return { config, bell, t, textarea }
  },

  data() {
    return store.state
  },

  beforeMount() {
    document.title = config.title
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

    onDragToggle() {
      store.toggleDragging()

      _client.applySettings(this.settings, {
        dragging: this.dragging
      })
    },

    onUpdateSettings({ key, value }) {
      store.updateSettings({
        [key]: value
      })

      if (this.connected) {
        _client.applySettings(this.settings, {
          dragging: this.dragging
        })
      }
    },

    onError(message) {
      store.addMessage(message, 'error')
    },

    onBell() {
      if (this.settings.bell) {
        this.bell.play()
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
        power: _client.hasPowerCapabilities()
      })
    },

    onClipboard(e) {
      store.updateClipboard(e.detail.text)
    },

    onClipboardClear() {
      _client.clipboardPasteFrom('')
      store.clearClipboard()
    },

    onClipboardUpdate(text) {
      _client.clipboardPasteFrom(text)
      store.updateClipboard(text)
    },

    onCredentialsRequired() {
      store.toggleLogin(true)
    },

    onConnected() {
      store.addMessage(this.t('messages.connected'))
      store.connectionActivated()
      _client.focus()
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

      _client = VuenseeRFB.connect({
        root: this.$refs.view,
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
      _client.disconnect()
    },

    onMaximize() {
      fullscreen.request()
    },

    onMinimize() {
      fullscreen.exit()
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

    onToggleTouchKeyboard() {
      store.toggleTouchKeyboard()
    },

    onPowerShutdown() {
      _client.machineShutdown()
    },

    onPowerReboot() {
      _client.machineReboot()
    },

    onPowerReset() {
      _client.machineReset()
    },

    onKeyToggle(key) {
      const toggle = store.toggleKey(key)
      _client.sendKeyCommand(key, toggle)
      _client.focus()
    },

    onKeySend(key) {
      if (key === 'cad') {
        _client.sendCtrlAlDel()
      } else {
        _client.sendKeyCommand(key)
      }

      _client.focus()
    },

    onMouseOut() {
      if (this.connected) {
        _client.focus()
      }
    },

    onSubmitCredentials(creds) {
      store.updateSettings(creds)
      _client.sendCredentials(creds)
    },

    onMessageClick(ev, { key }) {
      store.removeMessage(key)
    },

    onTouchKeyboardFocus() {
      _client.focusOnClick = true
    },

    onTouchKeyboardBlur() {
      _client.focusOnClick = false
    },

    onTouchKeyboardHide() {
      store.toggleTouchKeyboard(false)
    },

    onTouchKeyboardInput(key) {
      _client.sendKeyCommand(key, undefined)
    },

    onTogglePanel() {
      store.togglePanelOpen()

      if (document.activeElement) {
        document.activeElement.blur()
      }
    }
  }
}
</script>
