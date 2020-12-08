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
          name="sharedMode"
          :label="t('settings.session.sharedMode')"
          :checked="settings.sharedMode"
          @change="onChange('sharedMode', $event)"
        />

        <Checkbox
          name="viewOnly"
          :label="t('settings.session.viewOnly')"
          :checked="settings.viewOnly"
          @change="onChange('viewOnly', $event)"
        />

        <Checkbox
          name="bell"
          :label="t('settings.session.bell')"
          :checked="settings.bell"
          @change="onChange('bell', $event)"
        />

        <Checkbox
          name="dotCursor"
          :label="t('settings.session.dotCursor')"
          :checked="settings.dotCursor"
          @change="onChange('dotCursor', $event)"
        />

        <Checkbox
          name="clipToWindow"
          :label="t('settings.session.clipToWindow')"
          :checked="settings.clipToWindow"
          @change="onChange('clipToWindow', $event)"
        />
      </SettingsGroup>

      <SettingsGroup :label="t('settings.visuals.header')">
        <Dropdown
          name="scalingMode"
          :label="t('settings.visuals.scalingMode')"
          :options="scalingModes"
          :value="settings.scalingMode"
          @change="onChange('scalingMode', $event)"
        />

        <Range
          name="quality"
          min="0"
          max="9"
          :label="`${t('settings.visuals.quality')} (${settings.quality})`"
          :value="settings.quality"
          @change="onChange('quality', $event)"
        />

        <Range
          name="compression"
          min="0"
          max="9"
          :label="`${t('settings.visuals.compression')} (${settings.compression})`"
          :value="settings.compression"
          @change="onChange('compression', $event)"
        />
      </SettingsGroup>

      <SettingsGroup :label="t('settings.connection.header')">
        <Input
          name="repeaterId"
          type="text"
          :label="t('settings.connection.repeaterId')"
          :value="settings.repeaterId"
          @input="onChange('repeaterId', $event)"
        />

        <Input
          required
          name="hostname"
          type="text"
          :label="t('settings.connection.hostname')"
          :value="settings.hostname"
          @input="onChange('hostname', $event)"
        />

        <Input
          required
          name="port"
          type="number"
          :label="t('settings.connection.port')"
          :value="settings.port"
          @input="onChange('port', $event)"
        />

        <Input
          name="path"
          type="text"
          :label="t('settings.connection.path')"
          :value="settings.path"
          @input="onChange('path', $event)"
        />

        <Input
          name="password"
          type="password"
          :label="t('settings.connection.password')"
          :value="settings.password"
          @input="onChange('password', $event)"
        />

        <Checkbox
          name="ssl"
          :label="t('settings.connection.ssl')"
          :checked="settings.ssl"
          @change="onChange('ssl', $event)"
        />

        <Checkbox
          name="reconnect"
          :label="t('settings.connection.reconnect')"
          :checked="settings.reconnect"
          @change="onChange('reconnect', $event)"
        />

        <Input
          name="reconnectDelay"
          type="number"
          :disabled="!settings.reconnect"
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
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTargetInputValue } from '../../utils/dom'
import { scalingModes } from '../../utils/novnc'
import SettingsGroup from './SettingsGroup.vue'

const alwaysAvailable = [
  'viewOnly',
  'bell',
  'scalingMode',
  'quality',
  'compression',
  'clipToWindow',
  'dotCursor'
]

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
    const root = ref(null)

    const onChange = (key, ev) => emit('update', {
      key,
      value: getTargetInputValue(ev)
    })

    // Expand all details
    onMounted(() => {
      Array
        .from(root.value.querySelectorAll('details'))
        .forEach(el => (el.open = true))
    })

    // Disable certain inputs when connected
    watch(() => props.disabled, (disabled) => {
      Array
        .from(
          root
            .value
            .querySelector('form')
            .elements
        )
        .filter(el => el.tagName !== 'FIELDSET')
        .filter(el => !alwaysAvailable.includes(el.name))
        .forEach(el => (el.disabled = disabled))
    })

    return {
      t,
      root,
      onChange,
      scalingModes: scalingModes.map(k => [
        k,
        t(`scalingModes.${k}`)
      ])
    }
  }
}
</script>
