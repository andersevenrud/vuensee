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
      <details>
        <summary>{{ t('settings.session.header') }}</summary>
        <fieldset>
          <div>
            <label>
              <input
                name="sharedMode"
                type="checkbox"
                :checked="settings.sharedMode"
                @change="onChange('sharedMode', $event)"
              >
              <span>
                {{ t('settings.session.sharedMode') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                name="viewOnly"
                type="checkbox"
                :checked="settings.viewOnly"
                @change="onChange('viewOnly', $event)"
              >
              <span>
                {{ t('settings.session.viewOnly') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                name="bell"
                type="checkbox"
                :checked="settings.bell"
                @change="onChange('bell', $event)"
              >
              <span>
                {{ t('settings.session.bell') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                name="dotCursor"
                type="checkbox"
                :checked="settings.dotCursor"
                @change="onChange('dotCursor', $event)"
              >
              <span>
                {{ t('settings.session.dotCursor') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                name="clipToWindow"
                type="checkbox"
                :checked="settings.clipToWindow"
                @change="onChange('clipToWindow', $event)"
              >
              <span>
                {{ t('settings.session.clipToWindow') }}
              </span>
            </label>
          </div>
        </fieldset>
      </details>

      <details>
        <summary>{{ t('settings.visuals.header') }}</summary>
        <fieldset>
          <div>
            <label>
              <span>
                {{ t('settings.visuals.scalingMode') }}
              </span>
              <select
                name="scalingMode"
                @change="onChange('scalingMode', $event)"
              >
                <option
                  v-for="([k, v]) in scalingModes"
                  :key="k"
                  :selected="k === settings.scalingMode"
                  :value="v"
                >
                  {{ v }}
                </option>
              </select>
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.visuals.quality') }} ({{ settings.quality }})
              </span>
              <input
                name="quality"
                type="range"
                min="0"
                max="9"
                :value="settings.quality"
                @change="onChange('quality', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.visuals.compression') }} ({{ settings.compression }})
              </span>
              <input
                name="compression"
                type="range"
                min="0"
                max="9"
                :value="settings.compression"
                @change="onChange('compression', $event)"
              >
            </label>
          </div>
        </fieldset>
      </details>

      <details>
        <summary>{{ t('settings.connection.header') }}</summary>
        <fieldset>
          <div>
            <label>
              <span>
                {{ t('settings.connection.repeaterId') }}
              </span>
              <input
                name="repeaterId"
                type="text"
                :value="settings.repeaterId"
                @input="onChange('repeaterId', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.connection.hostname') }}
              </span>
              <input
                required
                name="hostname"
                type="text"
                :value="settings.hostname"
                @input="onChange('hostname', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.connection.port') }}
              </span>
              <input
                required
                name="port"
                type="number"
                :value="settings.port"
                @input="onChange('port', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.connection.path') }}
              </span>
              <input
                name="path"
                type="text"
                :value="settings.path"
                @input="onChange('path', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.connection.password') }}
              </span>
              <input
                name="password"
                type="password"
                :value="settings.password"
                @input="onChange('password', $event)"
              >
            </label>
          </div>

          <div>
            <label>
              <input
                name="ssl"
                type="checkbox"
                :checked="settings.ssl"
                @change="onChange('ssl', $event)"
              >
              <span>
                {{ t('settings.connection.ssl') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <input
                name="reconnect"
                type="checkbox"
                :checked="settings.reconnect"
                @change="onChange('reconnect', $event)"
              >
              <span>
                {{ t('settings.connection.reconnect') }}
              </span>
            </label>
          </div>

          <div>
            <label>
              <span>
                {{ t('settings.connection.reconnectDelay') }}
              </span>
              <input
                required
                name="reconnectDelay"
                type="number"
                :value="settings.reconnectDelay"
                :disabled="!settings.reconnect"
                @input="onChange('reconnectDelay', $event)"
              >
            </label>
          </div>
        </fieldset>
      </details>
    </form>
  </div>
</template>

<style module>
.root {
  overflow: auto;
  height: 100%;
  user-select: none;
}

.form details[open] {
  margin-bottom: var(--app-margin);
}

.form details summary {
  background-color: var(--app-accordian-background-color);
  padding: var(--app-margin-half);
  cursor: pointer;
}

.form details[open] summary {
  margin-bottom: var(--app-margin);
}

.form fieldset {
  border: 0 none;
  margin: 0 var(--app-margin);
  padding: 0;
}

.form fieldset > div:not(:last-child) {
  margin-bottom: var(--app-margin-half);
}

.form input[type="password"],
.form input[type="text"],
.form input[type="number"],
.form input[type="range"],
.form select {
  display: block;
  width: 100%;
  margin-top: var(--app-margin-quarter);
}
</style>

<script>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTargetInputValue } from '../utils'

const scalingModes = [
  ['off', 'None'],
  ['scale', 'Local scaling'],
  ['remote', 'Remote scaling']
]

const alwaysAvailable = [
  'bell',
  'scalingMode',
  'quality',
  'compression',
  'clipToWindow',
  'dotCursor'
]

export default {
  name: 'Settings',

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
      scalingModes,
      onChange
    }
  }
}
</script>
