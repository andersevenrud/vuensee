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
  border: var(--vuensee-input-border);
  background-color: var(--vuensee-input-background-color);
  padding: var(--vuensee-margin-half);
}

.active {
  background: var(--vuensee-background-color);
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
