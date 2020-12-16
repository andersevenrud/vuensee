<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
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
        :panel-open="panelOpen"
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
        @toggle-panel="onTogglePanel"
      />

      <template v-if="panelOpen">
        <Power
          v-if="config.features.power"
          v-show="showPower"
          @shutdown="onPowerShutdown"
          @reboot="onPowerReboot"
          @reset="onPowerReset"
        />

        <Keys
          v-if="config.features.keys"
          v-show="showKeys"
          :active="keys"
          @toggle="onKeyToggle"
          @send="onKeySend"
        />

        <Clipboard
          v-if="config.features.clipboard"
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
          @submit="onConnectRequest"
        />
      </template>
    </Panel>

    <Logo
      :title="config.title"
    />

    <div
      v-show="connected"
      ref="view"
      :class="$style.vnc"
    />

    <Login
      v-if="loginOpen"
      @submit="onSubmitCredentials"
      @cancel="onDisconnectRequest"
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
</style>

<script>
import { onBeforeMount, onBeforeUnmount, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { fullscreen } from '../utils/dom'
import { VuenseeRFB, createBell } from '../utils/novnc'
import { localStorageSettings } from '../utils/config'
import { diffObject } from '../utils/primitives'
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
    const { t } = useI18n()
    const rfb = ref({})
    const reconnectTimeout = ref(null)
    const textarea = ref(null)
    const windowTitle = computed({
      set: title => (document.title = title ? `${title} - ${config.title}` : config.title)
    })

    const bell = createBell(config.bell)
    const onFullscreenChange = () => store.toggleFullscreen(!!fullscreen.element())

    onBeforeMount(() => (windowTitle.value = ''))
    onBeforeMount(() => window.addEventListener('fullscreenchange', onFullscreenChange))
    onBeforeUnmount(() => clearTimeout(reconnectTimeout.value))
    onBeforeUnmount(() => window.removeEventListener('fullscreenchange', onFullscreenChange))
    onBeforeUnmount(() => {
      if (rfb.value.disconnect) {
        rfb.value.disconnect()
      }
    })

    return { config, bell, t, textarea, rfb, reconnectTimeout, windowTitle }
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

    onDragToggle() {
      store.toggleDragging()

      this.rfb.applySettings(this.settings, {
        dragging: this.dragging
      })
    },

    onUpdateSettings({ key, value }) {
      const oldSettings = { ...this.settings }
      const newSettings = store.assignSettings({
        [key]: value
      })

      if (this.connected) {
        this.rfb.applySettings(this.settings, {
          dragging: this.dragging
        })
      }

      if (config.localStorageBlacklist.includes(key)) {
        return
      }

      localStorageSettings.assign(diffObject(oldSettings, newSettings))
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
      this.windowTitle = ev.detail.name
    },

    onCapabilities() {
      store.assignCapabilities({
        power: this.rfb.hasPowerCapabilities()
      })
    },

    onClipboard(e) {
      store.updateClipboard(e.detail.text)
    },

    onClipboardClear() {
      this.rfb.clipboardPasteFrom('')
      store.updateClipboard('')
    },

    onClipboardUpdate(text) {
      this.rfb.clipboardPasteFrom(text)
      store.updateClipboard(text)
    },

    onCredentialsRequired() {
      store.addMessage(this.t('messages.credentialsRequired'))
      store.toggleLogin(true)
    },

    onConnected() {
      store.addMessage(this.t('messages.connected'))
      store.connectionActivated()
      this.rfb.focus()
    },

    onDisconnected(e) {
      this.windowTitle = ''

      if (e.detail.clean) {
        store.addMessage(this.t('messages.disconnected'))
      } else {
        if (store.state.connected) {
          store.addMessage(this.t('messages.connectionLost'), 'error')
        } else {
          store.addMessage(this.t('messages.connectionFailure'), 'error')
        }
      }

      const reconnect = this.connected || this.connecting ? this.settings.reconnect : false
      store.connectionDeactivated(reconnect)

      if (reconnect) {
        const delay = this.settings.reconnectDelay
        store.addMessage(this.t('messages.reconnecting', { delay }))

        this.reconnectTimeout = setTimeout(() => {
          this.onConnectRequest()
        }, delay)
      }
    },

    onConnectRequest() {
      store.addMessage(this.t('messages.connecting'))
      store.connectionActivate(store.state.reconnecting)

      this.rfb = VuenseeRFB.connect({
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
    console.warn('xxx')
      clearTimeout(this.reconnectTimeout)
      store.connectionDeactivate()
      this.rfb.disconnect()
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
      this.rfb.machineShutdown()
    },

    onPowerReboot() {
      this.rfb.machineReboot()
    },

    onPowerReset() {
      this.rfb.machineReset()
    },

    onKeyToggle(key) {
      const toggle = store.toggleKey(key)
      this.rfb.sendKeyCommand(key, toggle)
      this.rfb.focus()
    },

    onKeySend(key) {
      if (key === 'cad') {
        this.rfb.sendCtrlAltDel()
      } else {
        this.rfb.sendKeyCommand(key)
      }

      this.rfb.focus()
    },

    onMouseOut() {
      if (this.connected) {
        this.rfb.focus()
      }
    },

    onSubmitCredentials(creds) {
      store.assignSettings(creds)
      this.rfb.sendCredentials(creds)
    },

    onMessageClick(ev, { key }) {
      store.removeMessage(key)
    },

    onTouchKeyboardFocus() {
      this.rfb.focusOnClick = true
    },

    onTouchKeyboardBlur() {
      this.rfb.focusOnClick = false
    },

    onTouchKeyboardHide() {
      store.toggleTouchKeyboard(false)
    },

    onTouchKeyboardInput(key) {
      this.rfb.sendKeyCommand(key, undefined)
    },

    onTogglePanel() {
      store.togglePanelOpen()

      setTimeout(() => {
        if (document.activeElement) {
          document.activeElement.blur()
        }
      }, 1)
    }
  }
}
</script>
