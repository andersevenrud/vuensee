<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div
    :class="$style.controls"
  >
    <Button
      v-if="features.settings"
      :title="t('controls.settings')"
      @click="$emit('settings')"
    >
      <SettingsIcon />
    </Button>

    <Button
      v-if="features.keys && !viewOnly"
      :title="t('controls.keys')"
      :disabled="!connected"
      @click="$emit('toggle-keys')"
    >
      <KeysIcon />
    </Button>

    <Button
      v-if="features.clipboard && !viewOnly"
      :title="t('controls.clipboard')"
      :disabled="!connected"
      @click="$emit('toggle-clipboard')"
    >
      <ClipboardIcon />
    </Button>

    <Button
      v-if="features.viewportDragging"
      :title="t('controls.drag')"
      :disabled="!connected || !clipToWindow"
      :active="dragging"
      @click="$emit('drag')"
    >
      <DragIcon />
    </Button>

    <template v-if="features.fullscreen">
      <Button
        v-if="fullscreen"
        :title="t('controls.fullscreen')"
        @click="$emit('minimize')"
      >
        <MinimizeIcon />
      </Button>

      <Button
        v-else
        :title="t('controls.fullscreen')"
        @click="$emit('maximize')"
      >
        <MaximizeIcon />
      </Button>
    </template>

    <Button
      v-if="features.power && !viewOnly"
      :title="t('controls.power')"
      :disabled="connecting || !power"
      @click="$emit('power')"
    >
      <PowerIcon />
    </Button>

    <Button
      v-if="connecting || reconnecting || connected"
      :title="t('controls.disconnect')"
      @click="$emit('disconnect')"
    >
      <DisconnectIcon />
    </Button>

    <Button
      v-else
      :title="t('controls.connect')"
      @click="$emit('connect')"
    >
      <ConnectIcon />
    </Button>
  </div>
</template>

<style module>
.controls {
  display: flex;
}

.controls button {
  border: 0 none;
  background: transparent;
}
</style>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Controls',

  props: {
    connected: {
      type: Boolean,
      required: true
    },
    connecting: {
      type: Boolean,
      required: true
    },
    reconnecting: {
      type: Boolean,
      required: true
    },
    fullscreen: {
      type: Boolean,
      required: true
    },
    power: {
      type: Boolean,
      required: true
    },
    viewOnly: {
      type: Boolean,
      required: true
    },
    features: {
      type: Object,
      required: true
    },
    dragging: {
      type: Boolean,
      required: true
    },
    clipToWindow: {
      type: Boolean,
      required: true
    }
  },

  emits: [
    'settings',
    'minimize',
    'maximize',
    'disconnect',
    'connect',
    'toggle-keys',
    'toggle-clipboard',
    'power',
    'drag'
  ],

  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>
