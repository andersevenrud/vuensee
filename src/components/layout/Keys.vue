<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <div :class="$style.keys">
    <div
      v-for="([n, k]) in buttons"
      :key="k"
      :class="$style.button"
    >
      <Button
        :active="active[k]"
        @click="$emit(n, k)"
      >
        {{ t(`keys.${k}`) }}
      </Button>
    </div>
  </div>
</template>

<style module>
.keys {
  display: flex;
  padding: var(--vuensee-margin-quarter);
  align-items: stretch;
  box-sizing: border-box;
}

.button {
  flex: 1 1 auto;
  margin: var(--vuensee-margin-quarter);
  overflow: hidden;
}

.button button {
  display: block;
  width: 100%;
}
</style>

<script>
import { useI18n } from 'vue-i18n'

const buttons = [
  ['toggle', 'ctrl'],
  ['toggle', 'alt'],
  ['send', 'windows'],
  ['send','tab'],
  ['send','esc'],
  ['send','cad']
]

export default {
  name: 'Keys',

  props: {
    active: {
      type: Object,
      required: true
    }
  },

  emits: [
    'toggle',
    'send'
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
