<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <details
    ref="details"
    :class="$style.details"
  >
    <summary>{{ label }}</summary>
    <div>
      <slot />
    </div>
  </details>
</template>

<style module>
.details[open] {
  margin-bottom: var(--app-margin);
}

.details summary {
  background-color: var(--app-accordian-background-color);
  padding: var(--app-margin-half);
  cursor: pointer;
}

.details[open] summary {
  margin-bottom: var(--app-margin);
}

.details > div {
  margin: 0 var(--app-margin);
}

.details > div > div:not(:last-child) {
  margin-bottom: var(--app-margin-half);
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
