<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div
    ref="root"
    :class="$style.root"
  >
    <form
      :class="$style.form"
      @submit.prevent
    >
      <SettingsGroup :label="t('settings.session.header')">
        <Checkbox
          :disabled="disabled"
          :label="t('settings.session.sharedMode')"
          :checked="settings.sharedMode"
          @change="onChange('sharedMode', $event)"
        />

        <Checkbox
          :label="t('settings.session.viewOnly')"
          :checked="settings.viewOnly"
          @change="onChange('viewOnly', $event)"
        />

        <Checkbox
          :label="t('settings.session.bell')"
          :checked="settings.bell"
          @change="onChange('bell', $event)"
        />

        <Checkbox
          :label="t('settings.session.dotCursor')"
          :checked="settings.dotCursor"
          @change="onChange('dotCursor', $event)"
        />

        <Checkbox
          :label="t('settings.session.clipToWindow')"
          :checked="settings.clipToWindow"
          :disabled="settings.scaleMode === 'scale'"
          @change="onChange('clipToWindow', $event)"
        />
      </SettingsGroup>

      <SettingsGroup :label="t('settings.visuals.header')">
        <Dropdown
          :label="t('settings.visuals.scalingMode')"
          :options="scalingModes"
          :value="settings.scalingMode"
          @change="onChange('scalingMode', $event)"
        />

        <Range
          min="0"
          max="9"
          :label="`${t('settings.visuals.quality')} (${settings.quality})`"
          :value="settings.quality"
          @change="onChange('quality', $event)"
        />

        <Range
          min="0"
          max="9"
          :label="`${t('settings.visuals.compression')} (${settings.compression})`"
          :value="settings.compression"
          @change="onChange('compression', $event)"
        />
      </SettingsGroup>

      <SettingsGroup :label="t('settings.connection.header')">
        <Input
          :disabled="disabled"
          :label="t('settings.connection.repeaterId')"
          :value="settings.repeaterId"
          @input="onChange('repeaterId', $event)"
        />

        <Input
          required
          :disabled="disabled"
          :label="t('settings.connection.hostname')"
          :value="settings.hostname"
          @input="onChange('hostname', $event)"
        />

        <Input
          required
          type="number"
          :disabled="disabled"
          :label="t('settings.connection.port')"
          :value="settings.port"
          @input="onChange('port', $event)"
        />

        <Input
          :disabled="disabled"
          :label="t('settings.connection.path')"
          :value="settings.path"
          @input="onChange('path', $event)"
        />

        <Input
          type="password"
          :disabled="disabled"
          :label="t('settings.connection.password')"
          :value="settings.password"
          @input="onChange('password', $event)"
        />

        <Checkbox
          :disabled="disabled"
          :label="t('settings.connection.ssl')"
          :checked="settings.ssl"
          @change="onChange('ssl', $event)"
        />

        <Checkbox
          :disabled="disabled"
          :label="t('settings.connection.reconnect')"
          :checked="settings.reconnect"
          @change="onChange('reconnect', $event)"
        />

        <Input
          type="number"
          :disabled="!settings.reconnect || disabled"
          :label="t('settings.connection.reconnectDelay')"
          :value="settings.reconnectDelay"
          @input="onChange('reconnectDelay', $event)"
        />
      </SettingsGroup>
    </form>
  </div>
</template>

<style module>
.root {
  overflow: auto;
  height: 100%;
  user-select: none;
}
</style>

<script>
import { useI18n } from 'vue-i18n'
import { getTargetInputValue } from '../../utils/dom'
import { scalingModes } from '../../utils/novnc'
import SettingsGroup from './SettingsGroup.vue'

export default {
  name: 'Settings',

  components: {
    SettingsGroup
  },

  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  },

  emits: [
    'update'
  ],

  setup(props, { emit }) {
    const { t } = useI18n()

    const onChange = (key, ev) => emit('update', {
      key,
      value: getTargetInputValue(ev)
    })

    return {
      t,
      onChange,
      scalingModes: scalingModes.map(k => [
        k,
        t(`scalingModes.${k}`)
      ])
    }
  }
}
</script>
