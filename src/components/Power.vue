<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.power">
    <button
      v-for="button in buttons"
      :key="button"
      type="button"
      @click="$emit(button)"
    >
      {{ t(`power.${button}`) }}
    </button>
  </div>
</template>

<style module>
.power {
  display: flex;
  padding: var(--app-margin-quarter);
  align-items: stretch;
  box-sizing: border-box;
}

.power button {
  box-sizing: border-box;
  padding: var(--app-margin-half);
  margin: var(--app-margin-quarter);
  display: block;
  width: 100%;
  flex: 1 1;
}
</style>

<script>
import { useI18n } from 'vue-i18n'

const buttons = [
  'shutdown',
  'reboot',
  'reset'
]

export default {
  name: 'Power',

  emits: [
    'shutdown',
    'reboot',
    'reset'
  ],

  setup() {
    const { t } = useI18n()
    return {
      t,
      buttons
    }
  }
}
</script>
