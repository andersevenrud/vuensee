<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @link https://github.com/andersevenrud/vuensee
 @license MIT
-->
<template>
  <details
    ref="details"
    :class="$style.details"
  >
    <summary @contextmenu.prevent>
      {{ label }}
    </summary>

    <div>
      <slot />
    </div>
  </details>
</template>

<style module>
.details[open] {
  margin-bottom: var(--vuensee-margin);
}

.details summary {
  background-color: var(--vuensee-accordian-background-color);
  padding: var(--vuensee-margin-half);
  cursor: pointer;
  transition: var(--vuensee-default-transition);
}
.details summary:focus {
  outline: var(--vuensee-input-outline);
}

.details[open] summary {
  margin-bottom: var(--vuensee-margin);
}

.details > div {
  margin: 0 var(--vuensee-margin);
}

.details > div > div:not(:last-child) {
  margin-bottom: var(--vuensee-margin-half);
}
</style>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'SettingsGroup',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup() {
    const details = ref(null)
    onMounted(() => (details.value.open = true))
    return { details }
  }
}
</script>
