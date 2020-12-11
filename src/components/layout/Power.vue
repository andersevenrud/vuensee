<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.power">
    <Button
      v-for="button in buttons"
      :key="button"
      @click="$emit(button)"
    >
      {{ t(`power.${button}`) }}
    </Button>
  </div>
</template>

<style module>
.power {
  display: flex;
  padding: var(--vuensee-margin-quarter);
  align-items: stretch;
  box-sizing: border-box;
}

.power button {
  margin: var(--vuensee-margin-quarter);
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
