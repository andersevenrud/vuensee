<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <div :class="$style.keys">
    <div
      v-for="([n, k]) in buttons"
      :key="k"
      :class="style(k)"
    >
      <button
        type="button"
        @click="$emit(n, k)"
      >
        {{ t(`keys.${k}`) }}
      </button>
    </div>
  </div>
</template>

<style module>
.keys {
  display: flex;
  padding: var(--app-margin-quarter);
  align-items: stretch;
  box-sizing: border-box;
}

.button {
  flex: 1 1 auto;
  margin: var(--app-margin-quarter);
  overflow: hidden;
}

.button button {
  box-sizing: border-box;
  padding: var(--app-margin-half);
  display: block;
  width: 100%;
}

.active button {
  background: var(--app-background-color);
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
  },

  methods: {
    style(k) {
      const styles = [this.$style.button]
      if (this.active[k]) {
        styles.push(this.$style.active)
      }

      return styles
    }
  }
}
</script>
