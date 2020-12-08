<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <details :class="$style.details">
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
export default {
  name: 'SettingsGroup',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
