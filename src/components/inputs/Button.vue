<!--
 vuensee
 @author Anders Evenrud <andersevenrud@gmail.com>
 @license MIT
-->
<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="{ [$style.button]: true, [$style.active]: active }"
  >
    <slot />
  </button>
</template>

<style module>
.button {
  border: var(--app-input-border);
  background-color: var(--app-input-background-color);
  padding: var(--app-margin-half);
}

.active {
  background: var(--app-background-color);
}
</style>

<script>
export default {
  name: 'Button',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
